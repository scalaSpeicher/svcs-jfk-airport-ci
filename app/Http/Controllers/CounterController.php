<?php

namespace App\Http\Controllers;

use App\Models\Counter;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use stdClass;

class CounterController extends Controller
{
    protected $helperMethodsObj;

    public function __construct()
    {
        $this->helperMethodsObj = new HelperMethods();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Filter for 3rd-party user -- should see only counters which have airlines assigned to user
        $user = Auth::user();
        $counters = [];

        $itemsPerPage = $this->helperMethodsObj->getItemsPerPageCookie($request);

        if ($user->hasRole('3rd-party-user')) {

            $userAssignedAirlines = json_decode($user->airlines);
            if (!$userAssignedAirlines) {
                $counters = [];
            } else {
                // $counters = Counter::whereIn('airline_id', $userAssignedAirlines)
                $counters = Counter::select('counters.*')
                    ->when($request->input('search'), function ($query, $search): void {
                        // $query->whereIn('airline_id', $userAssignedAirlines)
                        $query->where(function ($q) use ($search): void {
                            $q->where('row', 'like', "%{$search}%")
                                ->orWhere('position', 'like', "%{$search}%")
                                ->orWhere('counters.width', 'like', "%{$search}%")
                                ->orWhere('counters.type', 'like', "%{$search}%");
                        });
                    })
                    ->when($request->input('sort'), function ($query, $sortAttribute): void {

                        $sortOrder = 'ASC';
                        if (strncmp($sortAttribute, '-', 1) === 0) {
                            $sortOrder = 'DESC';
                            $sortAttribute = mb_substr($sortAttribute, 1);
                        }
                        if ($sortAttribute === 'counter_location') {
                            $query
                                ->orderBy('row', $sortOrder)
                                ->orderBy('counter_location', $sortOrder);
                        } else {
                            $query
                                ->orderBy($sortAttribute, $sortOrder);
                        }
                    })
                    ->paginate($itemsPerPage)
                    ->withQueryString();
            }
        } else {
            // Either super-admin or JFK-User
            $counters = Counter::select('counters.*')
                ->when($request->input('search'), function ($query, $search): void {
                    if ($search[0] === '0') {
                        $query->where('counter_location', '=', "{$this->cleanCounterLocation($search)}");
                    } elseif (str_contains($search, '-')) {
                        $this->locationSearch($query, $search);
                    } else {
                        $query->where('row', '=', "{$search}")
                            ->orWhere('counter_location', '=', "{$search}")
                            ->orWhere('position', 'like', "%{$search}%")
                            ->orWhere('width', 'like', "%{$search}%")
                            ->orWhere('type', 'like', "%{$search}%");
                    }
                })->when($request->input('sort'), function ($query, $sortAttribute): void {
                    $sortOrder = 'ASC';
                    if (strncmp($sortAttribute, '-', 1) === 0) {
                        $sortOrder = 'DESC';
                        $sortAttribute = mb_substr($sortAttribute, 1);
                    }
                    if ($sortAttribute === 'counter_location') {
                        $query
                            ->orderBy('row', $sortOrder)
                            ->orderBy('counter_location', $sortOrder);
                    } else {
                        $query->orderBy($sortAttribute, $sortOrder);
                    }
                })
                ->paginate($itemsPerPage)
                ->withQueryString();
        }
        if ($counters) {
            foreach ($counters as $key => $counter) {
                $counter->position = ucfirst($counter->position);
                $counter->counter_location = $counter->row . '-' . str_pad($counter->counter_location, 2, '0', STR_PAD_LEFT);
                $counter->type = ucfirst($counter->type);
            }
        }

        return Inertia::render(
            'Counters/Index',
            [
                'counters' => $counters,
                'canReadCounters' => Gate::allows('counters.index'),
                'canAddCounters' => Gate::allows('counters.create'),
                'canEditCounters' => Gate::allows('counters.edit'),
                'canDeleteCounters' => Gate::allows('counters.destroy'),
                'filters' => $request->only(['search']),
                'isSuperAdmin' => Gate::allows('super-admin'),
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(
            'Counters/EditCounter',
            [
                'counter' => new stdClass(),
                'canReadCounters' => Gate::allows('counters.index'),
                'canAddCounters' => Gate::allows('counters.create'),
                'canEditCounters' => Gate::allows('counters.edit'),
                'canDeleteCounters' => Gate::allows('counters.destroy'),
                'formMode' => 'addCounter',
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
                'counter_location' => 'required|integer|unique:counters,counter_location,NULL,id,row,' . $request->row,
                'row' => 'required|integer',
                'position' => 'required|in:entry,security',
                'width' => 'required|integer',
                'type' => 'required|in:single,double',
            ]);

            $request->merge([
                'updated_at' => date('Y-m-d H:i:s'),
                'updated_by' => Auth::user()->id,
            ]);

            Counter::create($request->post());
            $message = 'Counter added successfully.';

            return redirect()->route('counters.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem adding new counter. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): void
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $counter = Counter::find($id);

        return Inertia::render(
            'Counters/EditCounter',
            [
                'counter' => $counter,
                'canReadCounters' => Gate::allows('counters.index'),
                'canAddCounters' => Gate::allows('counters.create'),
                'canEditCounters' => Gate::allows('counters.edit'),
                'canDeleteCounters' => Gate::allows('counters.destroy'),
                'formMode' => 'editCounter',
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $counter = Counter::find($id);

            $request->validate([
                'counter_location' => 'required|integer',
                'row' => 'required|integer',
                'position' => 'required|in:entry,security',
                'width' => 'required|integer',
                'type' => 'required|in:single,double',
            ]);

            $counter->counter_location = $request->counter_location;
            $counter->row = $request->row;
            $counter->position = $request->position;
            $counter->width = $request->width;
            $counter->type = $request->type;

            // Setting the manual override flag to true.
            // It will be set to false by aut-update script when there is no more flights for that airline using this row
            $counter->updated_at = date('Y-m-d H:i:s');
            $counter->updated_by = Auth::user()->id;

            $counter->save();
            /* return Inertia::render('Counters/Index', [
                'message' => 'Counter updated successfully.',
            ]); */

            $message = 'Counter updated successfully.';

            return redirect()->route('counters.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem updating counter. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Counter $counter, $id)
    {
        try {
            $counter = Counter::find($id);

            $counter->delete();
            $message = 'Counter deleted successfully.';

            return redirect()->route('counters.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem deleting counter. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    public function cleanCounterLocation($counterLocation)
    {
        if (!empty($counterLocation) && $counterLocation[0] === '0' && mb_strlen($counterLocation) > 1) {
            $cleanLocation = mb_substr($counterLocation, 1);
        } else {
            $cleanLocation = $counterLocation;
        }

        return $cleanLocation;
    }

    public function locationSearch($query, $search)
    {
        $searchArr = explode('-', $search);
        if (!empty($searchArr[0]) && !empty($searchArr[1])) {
            $query->where('row', 'like', "%{$searchArr[0]}%")
                ->where('counter_location', '=', "{$this->cleanCounterLocation($searchArr[1])}");
        } elseif (!empty($searchArr[0])) {
            $query->where('row', 'like', "%{$searchArr[0]}%");
        } elseif (!empty($searchArr[1])) {
            $query->where('counter_location', '=', "{$this->cleanCounterLocation($searchArr[1])}");
        } else {
            $query->get();
        }

        return $query;
    }
}
