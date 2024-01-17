<?php

namespace App\Http\Controllers;

use App\Models\AirlinesBasic;
use App\Models\Planner;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Container\Container;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use stdClass;

class PlannerController extends Controller
{
    protected $helperMethodsObj;

    public function __construct(HelperMethods $helperMethodsObj)
    {
        $this->helperMethodsObj = $helperMethodsObj;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (!$request->filled('active_only')) {
            return redirect()->route('planners.index', ['today_only' => 0, 'search_by' => 'open', 'active_only' => 1, 'sort' => 'checkindesk']);
        }
        // Filter for 3rd-party user -- should see only counters which have airlines assigned to user
        $user = Auth::user();
        $planners = [];
        $searchAttributes = [
            'searchBy' => 'open',
            'todayOnly' => 0,
            'activeOnly' => 0,
            'rawSearch' => 0,
            'startDateRange' => now(),
            'endDateRange' => now(),
        ];
        $itemsPerPage = $this->helperMethodsObj->getItemsPerPageCookie($request);
        $searchAttributes = $this->getDateRanges($request, $searchAttributes);

        if ($searchAttributes['activeOnly']) {
            $planners = $this->helperMethodsObj->getActiveFlights();
        } else {
            if ($searchAttributes['rawSearch']) {
                $searchAttributes['startDateRange'] = ($request->input('checkin_open')) ? $request->input('checkin_open') : date('Y-m-d 00:00:00', strtotime(date('Y-m-d 00:00:00')) - 60 * 60 * 24 * 30);
                $searchAttributes['endDateRange'] = ($request->input('checkin_close')) ? $request->input('checkin_open') : date('Y-m-d 00:00:00', strtotime(date('Y-m-d 00:00:00')) + 60 * 60 * 24 * 30);
            }
            $planners = Planner::whereBetween('checkin_plan_' . $searchAttributes['searchBy'] . '_date_time', [$searchAttributes['startDateRange'], $searchAttributes['endDateRange']]);
        }

        if ($user->hasExactRoles('3rd-party-user')) {
            $userAssignedAirlines = json_decode($user->airlines);
            if (!$userAssignedAirlines) {
                $planners = [];
            }
            $planners = $user->getPlanners();
        }
        $planners = $this->processSearch($planners, $request, $searchAttributes);
        if ($searchAttributes['todayOnly'] && !$request->input('sort')) {
            $planners = $planners->sortByDesc('checkin_open_date_time');
        }
        if ($request->input('sort')) {
            $sortOrder = 'ASC';
            $sortAttribute = $request->input('sort');
            if (strncmp($sortAttribute, '-', 1) === 0) {
                $sortOrder = 'DESC';
                $sortAttribute = mb_substr($sortAttribute, 1);
            }
            if ($sortOrder === 'DESC') {
                $planners = $planners->sortByDesc($sortAttribute);
            } else {
                $planners = $planners->sortBy($sortAttribute);
            }
        }
        $planners = $planners->toArray();

        $page = Paginator::resolveCurrentPage('page');
        $path = Paginator::resolveCurrentPath();
        $planners_this_page = array_slice($planners, ($itemsPerPage * ($page - 1)), $itemsPerPage);
        $container = Container::getInstance();
        $plannersPage = $container->makeWith(LengthAwarePaginator::class, [
            'items' => $planners_this_page,
            'total' => count($planners),
            'perPage' => $itemsPerPage,
            'currentPage' => $page,
            'options' => [
                'path' => $path,
                'pageName' => 'page',
            ],
        ])->withQueryString();

        return Inertia::render(
            'Planners/Index',
            [
                'planners' => $plannersPage,
                'canReadPlanners' => Gate::allows('planners.index'),
                'canAddPlanners' => Gate::allows('planners.create'),
                'canEditPlanners' => Gate::allows('planners.edit'),
                'canDeletePlanners' => Gate::allows('planners.destroy'),
                'filters' => $request->only(['search', 'checkin_open', 'checkin_close', 'search_by', 'today_only', 'active_only']),
                'isSuperAdmin' => Gate::allows('super-admin'),
                'itemsPerPage' => $itemsPerPage,
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(
            'Planners/EditPlanners',
            [
                'planners' => new stdClass(),
                'checkinDesks' => $this->helperMethodsObj->getCheckinDesks(),
                'canReadPlanners' => Gate::allows('planners.index'),
                'canAddPlanners' => Gate::allows('planners.create'),
                'canEditPlanners' => Gate::allows('planners.edit'),
                'canDeletePlanners' => Gate::allows('planners.destroy'),
                'formMode' => 'add',
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'checkindesk' => 'required|min:2',
                'flight_identity' => 'required|min:2',
                'checkin_plan_close_date_time' => 'required|date',
                'checkin_plan_open_date_time' => 'required|date',
            ]);

            $dupeCheck = $this->dupeCheck($request);
            if ($dupeCheck !== null) {
                return redirect()->back()->with('message', 'Planner (ID: ' . $dupeCheck . ') exists! Please edit it instead.');
            }

            if ($this->validFlight($request->flight_identity) === false) {
                return redirect()->back()->with('message', 'No airline found for flight identity: ' . $request->flight_identity);
            }

            $request->merge([
                'updated_at' => date('Y-m-d H:i:s'),
                // 'updated_by' => Auth::user()->id,
            ]);

            Planner::create($request->post());
            $message = 'Planner added successfully.';

            return redirect()->route('planners.index', ['today_only' => 0, 'search_by' => 'open', 'active_only' => 1, 'sort' => 'checkindesk'])->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem adding new planner. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $Ids)
    {
        $planners = Planner::find(json_decode($Ids));
        $airlineLabels = $this->helperMethodsObj->getAirlineLabelsFromPlanners($planners);

        return Inertia::render(
            'Planners/EditPlanners',
            [
                'planners' => $planners,
                'airlineLabels' => $airlineLabels,
                'canReadPlanners' => Gate::allows('planners.index'),
                'canAddPlanners' => Gate::allows('planners.create'),
                'canEditPlanners' => Gate::allows('planners.edit'),
                'canDeletePlanners' => Gate::allows('planners.destroy'),
                'formMode' => 'edit',
            ]
        );
    }

    /**
     * Performs bulk update on planners
     *
     * @return void
     */
    public function update(string $updates): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $errorMessage = [];
            $sendUpdates = json_decode($updates);
            $key = array_keys($sendUpdates);
            $size = count($key);
            for ($i = 0; $i < $size; $i++) {
                $update = json_decode(json_encode($sendUpdates[$key[$i]]), true);
                $planner = Planner::findOrFail($update['id']);
                $planner->createOverride();
                $planner->save();
                $this->helperMethodsObj->createAudit($planner, [
                    'model' => 'Override',
                    'checkindesk' => $planner->checkindesk,
                    'flight_identity' => $planner->flight_identity,
                    'plan_open' => $planner->checkin_plan_open_date_time,
                    'plan_close' => $planner->checkin_plan_close_date_time,
                    'action' => 'Override',
                ]);
            }

            $result = Planner::bulkUpdateOrThrow($sendUpdates, true);

            if ($result) {
                DB::commit();
            }

            if (count($errorMessage) > 0) {
                return redirect()->back()->with('message', $errorMessage);
            }

            return redirect()->route('planners.index', ['today_only' => 0, 'search_by' => 'open', 'active_only' => 1, 'sort' => 'checkindesk'])->with('message', 'Planners updated successfully.');
        } catch (Exception $e) {
            DB::rollback();
            $message = 'There was a problem updating planners. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    public function cleanRequestInput($input)
    {
        if (is_array($input)) {
            if (array_key_exists('_value', $input)) {
                return $input['_value'];
            }
        }

        return $input;
    }

    public function processSearch(Builder $planners, Request $request, array $searchAttributes)
    {
        $planners = $planners
            ->when($request->input('search'), function ($query, $search) use ($searchAttributes): void {
                if ($searchAttributes['activeOnly']) {
                    $query->where(function (Builder $query) use ($search): void {
                        $query->where('checkindesk', 'like', "%{$search}%")
                            ->orWhere('flight_identity', 'like', "%{$search}%")
                            ->orWhere('class_code', '=', "{$search}");
                    });
                } else {
                    $query->whereBetween('checkin_plan_' . $searchAttributes['searchBy'] . '_date_time', [$searchAttributes['startDateRange'], $searchAttributes['endDateRange']])
                        ->where(function (Builder $query) use ($search): void {
                            $query->where('checkindesk', 'like', "%{$search}%")
                                ->orWhere('flight_identity', 'like', "%{$search}%")
                                ->orWhere('class_code', '=', "{$search}");
                        });
                }
            })->get();

        return $planners;
    }

    public function getDateRanges(Request $request, array $searchAttributes)
    {
        $searchAttributes['searchBy'] = $this->cleanRequestInput($request->input('search_by', ''));
        $searchAttributes['todayOnly'] = (int) $this->cleanRequestInput($request->input('today_only', '1'));
        $searchAttributes['activeOnly'] = (int) $this->cleanRequestInput($request->input('active_only', '0'));

        if ($searchAttributes['todayOnly']) {
            $searchAttributes['activeOnly'] = 0;
            $searchAttributes['rawSearch'] = 0;
            $today = date('Y-m-d 00:00:00');
            $searchAttributes['startDateRange'] = $today;
            $searchAttributes['endDateRange'] = date('Y-m-d H:i:s', strtotime($today . ' +1 day'));
        } elseif ($searchAttributes['activeOnly']) {
            $searchAttributes['rawSearch'] = 0;
            $searchAttributes['todayOnly'] = 0;
        } else {
            $defaultStartDate = date('Y-m-d H:i:s', strtotime('-7 days'));
            $searchAttributes['startDateRange'] = $this->getDateFromRequest($request->input('checkin_open'), $defaultStartDate);
            $searchAttributes['endDateRange'] = $this->getDateFromRequest($request->input('checkin_close'), date('Y-m-d H:i:s', strtotime($searchAttributes['startDateRange'] . ' +7 days')));
        }

        return $searchAttributes;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $trash)
    {
        try {
            $trashes = json_decode($trash);
            $key = array_keys($trashes);
            $size = count($key);
            for ($i = 0; $i < $size; $i++) {
                $deletion_id = json_decode(json_encode($trashes[$key[$i]]), true);
                $planner = Planner::findOrFail($deletion_id);
                $planner->createBackup();
                $this->helperMethodsObj->createAudit($planner, [
                    'model' => 'Override',
                    'checkindesk' => $planner->checkindesk,
                    'flight_identity' => $planner->flight_identity,
                    'plan_open' => $planner->checkin_plan_open_date_time,
                    'plan_close' => $planner->checkin_plan_close_date_time,
                    'action' => 'Backup',
                ]);
                $planner->delete();
            }
            $message = 'Deletion successfully.';

            return redirect()->route('planners.index', ['today_only' => 0, 'search_by' => 'open', 'active_only' => 1, 'sort' => 'checkindesk'])->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem deleting planners. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    protected function dupeCheck(Request|array $request)
    {
        if (!is_array($request)) {
            $dupeCheck = Planner::where([
                ['checkindesk', '=', $request->checkindesk],
                ['flight_identity', '=', $request->flight_identity],
                ['checkin_plan_close_date_time', '=', $request->checkin_plan_close_date_time],
                ['checkin_plan_open_date_time', '=', $request->checkin_plan_open_date_time],
            ])->get();
        } else {
            $dupeCheck = Planner::where([
                ['id', '!=', $request['id']],
                ['checkindesk', '=', $request['checkindesk']],
                ['flight_identity', '=', $request['flight_identity']],
                ['checkin_plan_close_date_time', '=', $request['checkin_plan_close_date_time']],
                ['checkin_plan_open_date_time', '=', $request['checkin_plan_open_date_time']],
            ])->get();
        }

        if (count($dupeCheck) > 0) {
            return $dupeCheck[0]->id;
        }

    }

    protected function validFlight(string $flight_id)
    {
        $validFlightCheck = AirlinesBasic::where('iata', mb_substr($flight_id, 0, 2))->get();

        return count($validFlightCheck) !== 0;
    }

    private function getDateFromRequest($input, $default)
    {
        if ($input) {
            return date('Y-m-d H:i:s', strtotime($this->cleanRequestInput($input)));
        }

        return $default;
    }
}
