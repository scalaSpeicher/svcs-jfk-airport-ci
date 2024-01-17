<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use stdClass;

class LocationController extends Controller
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
        $locations = Location::all();
        $itemsPerPage = $this->helperMethodsObj->getItemsPerPageCookie($request);

        return Inertia::render(
            'Locations/Index',
            [
                'locations' => $locations,
                'canReadLocations' => Gate::allows('locations.index'),
                'canAddLocations' => Gate::allows('locations.create'),
                'canEditLocations' => Gate::allows('locations.edit'),
                'canDeleteLocations' => Gate::allows('locations.destroy'),
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
            'Locations/EditLocations',
            [
                'location' => new stdClass(),
                'canReadLocations' => Gate::allows('locations.index'),
                'canAddLocations' => Gate::allows('locations.create'),
                'canEditLocations' => Gate::allows('locations.edit'),
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

            return redirect()->route('locations.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem... ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
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

            return redirect()->route('locations.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem... ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        try {

            $message = '';

            return redirect()->route('locations.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem... ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }
}
