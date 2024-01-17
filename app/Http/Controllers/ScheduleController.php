<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use stdClass;

class ScheduleController extends Controller
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
        $schedules = Schedule::all();
        $itemsPerPage = $this->helperMethodsObj->getItemsPerPageCookie($request);

        return Inertia::render(
            'Schedules/Index',
            [
                'schedules' => $schedules,
                'canReadSchedules' => Gate::allows('schedules.index'),
                'canAddSchedules' => Gate::allows('schedules.create'),
                'canEditSchedules' => Gate::allows('schedules.edit'),
                'canDeleteSchedules' => Gate::allows('schedules.destroy'),
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
            'Schedules/EditSchedules',
            [
                'message' => new stdClass(),
                'canReadSchedules' => Gate::allows('schedules.index'),
                'canAddSchedules' => Gate::allows('schedules.create'),
                'canEditSchedules' => Gate::allows('schedules.edit'),
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

            $message = '';

            return redirect()->route('schedules.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem... ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $Ids): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $updates): RedirectResponse
    {
        try {

            $message = '';

            return redirect()->route('schedules.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem... ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        try {

            $message = '';

            return redirect()->route('schedules.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem... ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }
}
