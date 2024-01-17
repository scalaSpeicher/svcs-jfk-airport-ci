<?php

namespace App\Http\Controllers;

use App\Models\ManualOverride;
use App\Models\Planner;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ManualOverrideController extends Controller
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
        $itemsPerPage = $this->helperMethodsObj->getItemsPerPageCookie($request);
        $overrides = ManualOverride::query()
            ->when($request->input('search'), function ($query, $search): void {
                // TODO - replace with actual cols
                $query->where('checkindesk', 'like', "%{$search}%")
                    ->orWhere('flight_identity', 'like', "%{$search}%")
                    ->orWhere('class_code', '=', "{$search}");
            })
            ->when($request->input('sort'), function ($query, $sortAttribute): void {

                $sortOrder = 'ASC';
                if (strncmp($sortAttribute, '-', 1) === 0) {
                    $sortOrder = 'DESC';
                    $sortAttribute = mb_substr($sortAttribute, 1);
                }
                $query->orderBy($sortAttribute, $sortOrder);
            })->paginate($itemsPerPage)
            ->withQueryString();

        return Inertia::render(
            'Overrides/Index',
            [
                'overrides' => $overrides,
                'canReadOverrides' => Gate::allows('overrides.index'),
                'canRestoreOverrides' => Gate::allows('overrides.restore'),
                'isSuperAdmin' => Gate::allows('super-admin'),
                'filters' => $request->only(['search']),
            ]
        );
    }

    /**
     * Restore the override / deletion
     */
    public function restore(string $restore)
    {
        try {
            $restores = json_decode($restore);
            $key = array_keys($restores);
            $size = count($key);
            for ($i = 0; $i < $size; $i++) {
                $restore_id = json_decode(json_encode($restores[$key[$i]]), true);
                $override = ManualOverride::findOrFail($restore_id);
                if ($override->deletion) {
                    $planner = Planner::create($override->getAttributes());
                    $override->action = 'Backup';
                } else {
                    $planner = Planner::where('manual_override_id', $override->id)->firstOrFail();
                    $planner->checkindesk = $override->checkindesk;
                    $planner->flight_identity = $override->flight_identity;
                    $planner->checkin_plan_close_date_time = $override->checkin_plan_close_date_time;
                    $planner->checkin_plan_open_date_time = $override->checkin_plan_open_date_time;
                    $planner->checkin_close_date_time = $override->checkin_close_date_time;
                    $planner->checkin_open_date_time = $override->checkin_open_date_time;
                    $planner->flight_origin_date = $override->flight_origin_date;
                    $planner->class_code = $override->class_code;
                    $planner->manual_override_id = null;
                    $override->action = 'Override';
                }
                $planner->save();
                $this->helperMethodsObj->createAudit($planner, [
                    'model' => 'Restore',
                    'planner_checkindesk' => $planner->checkindesk,
                    'planner_flight_identity' => $planner->flight_identity,
                    'planner_plan_open' => $planner->checkin_plan_open_date_time,
                    'planner_plan_close' => $planner->checkin_plan_close_date_time,
                    'override_checkindesk' => $override->checkindesk,
                    'override_flight_identity' => $override->flight_identity,
                    'override_plan_open' => $override->checkin_plan_open_date_time,
                    'override_plan_close' => $override->checkin_plan_close_date_time,
                    'action' => $override->action,
                ]);
                $override->delete();
            }
            $message = 'Removal successfully.';

            return redirect()->route('planners.index', ['today_only' => 0, 'search_by' => 'open', 'active_only' => 1, 'sort' => 'checkindesk'])->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem removing overrides. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
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
                $override = ManualOverride::findOrFail($deletion_id);
                if (!$override->deletion) {
                    $planner = Planner::where('manual_override_id', $override->id)->firstOrFail();
                    $planner->manual_override_id = null;
                    $planner->save();
                }
                $override->delete();
            }
            $message = 'Removal successfully.';

            return redirect()->back()->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem deleting overrides. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }
}
