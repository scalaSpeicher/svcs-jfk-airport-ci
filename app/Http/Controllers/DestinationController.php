<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use stdClass;

class DestinationController extends Controller
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
        // $destinations = Destination::paginate(10),
        $itemsPerPage = $this->helperMethodsObj->getItemsPerPageCookie($request);
        $destinations = Destination::query()
            ->when($request->input('search'), function ($query, $search): void {
                $query
                    ->where('iata', 'like', "%{$search}%")
                    ->orWhere('icao', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%")
                    ->orWhere('airport_name', 'like', "%{$search}%")
                    ->orWhere('country', 'like', "%{$search}%");
            })
            ->when($request->input('sort'), function ($query, $sortAttribute): void {

                $sortOrder = 'ASC';
                if (strncmp($sortAttribute, '-', 1) === 0) {
                    $sortOrder = 'DESC';
                    $sortAttribute = mb_substr($sortAttribute, 1);
                }
                $query
                    ->orderBy($sortAttribute, $sortOrder);
            })
            ->paginate($itemsPerPage)
            ->withQueryString();

        return Inertia::render(
            'Destinations/Index',
            [
                'destinations' => $destinations,
                'canReadDestinations' => Gate::allows('destinations.index'),
                'canAddDestinations' => Gate::allows('destinations.create'),
                'canEditDestinations' => Gate::allows('destinations.edit'),
                'canDeleteDestinations' => Gate::allows('destinations.destroy'),
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
            'Destinations/EditDestination',
            [
                'destination' => new stdClass(),
                'canReadDestinations' => Gate::allows('destinations.index'),
                'canAddDestinations' => Gate::allows('destinations.create'),
                'canEditDestinations' => Gate::allows('destinations.edit'),
                'canDeleteDestinations' => Gate::allows('destinations.destroy'),
                'formMode' => 'addDestination',
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
                'iata' => 'required|string|unique:destinations,iata',
                'icao' => 'required|string|unique:destinations,icao',
                'city' => 'required|string',
                'airport_name' => 'required|string',
                'country' => 'required|array:countryName,countryCode',
                'latitude' => 'required|numeric',
                'longitude' => 'required|numeric',
                'status' => 'required|in:Active,Inactive',
            ]);

            $request->merge(['created_by' => Auth::user()->id]);

            $country = $request->country;
            $request->merge([
                'country' => $country['countryName'],
            ]);
            $request->merge([
                'country_code' => $country['countryCode'],
            ]);

            Destination::create($request->post());

            $message = 'Destination created successfully.';

            return redirect()->route('destinations.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem creating destination. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render(
            'Destinations/EditDestination',
            [
                'destination' => Destination::find($id),
                'canReadDestinations' => Gate::allows('destinations.index'),
                'canEditDestinations' => Gate::allows('destinations.edit'),
                'canAddDestinations' => Gate::allows('destinations.create'),
                'canDeleteDestinations' => Gate::allows('destinations.destroy'),
                'formMode' => 'editDestination',
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {

            $request->validate([
                'city' => 'required|string',
                'status' => 'required|in:Active,Inactive',
            ]);

            $destination = Destination::find($id);

            $destination = Destination::find($id);
            $destination->city = $request->city;
            $destination->status = $request->status;
            $destination->updated_by = Auth::user()->id;
            $destination->save();

            $message = 'Destination updated successfully.';

            return redirect()->route('destinations.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem updating destination. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Destination $destination)
    {
        try {
            $destination->delete();
            $message = 'Destination deleted successfully.';

            return redirect()->route('destinations.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem deleting destination. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }
}
