<?php

namespace App\Http\Controllers;

use App\Models\AirlinesBasic;
use App\Models\AirlinesBranding;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use stdClass;

class AirlinesBasicController extends Controller
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
        $itemsPerPage = $this->helperMethodsObj->getItemsPerPageCookie($request);
        $airlines = AirlinesBasic::query()
            ->when($request->input('search'), function ($query, $search): void {
                $query
                    ->where('iata', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%");
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
            'Airlines/Index',
            [
                'airlines' => $airlines,
                'canReadAirlines' => Gate::allows('airlines.index'),
                'canAddAirlines' => Gate::allows('airlines.create'),
                'canEditAirlines' => Gate::allows('airlines.edit'),
                'canDeleteAirlines' => Gate::allows('airlines.destroy'),
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
            'Airlines/AddAirline',
            [
                'canReadAirlines' => Gate::allows('airlines.index'),
                'canAddAirlines' => Gate::allows('airlines.create'),
                'canEditAirlines' => Gate::allows('airlines.edit'),
                'canDeleteAirlines' => Gate::allows('airlines.destroy'),
                'isSuperAdmin' => Gate::allows('super-admin'),
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
                'iata' => 'required|string|unique:airlines,iata',
                'icao' => 'required|string|unique:airlines,icao',
                'name' => 'required|string',
                'status' => 'required|in:Active,Inactive',
            ]);

            $airline = AirlinesBasic::create($request->post());
            $airline_brand = new AirlinesBranding();
            $airline_brand->airlines_basic_id = $airline->id;
            $airline_brand->mode = $request->mode;
            $airline_brand->primary_color = $request->primary_color;
            $airline_brand->secondary_color = $request->secondary_color;
            $airline_brand->tertiary_color = $request->tertiary_color;
            $airline_brand->font = $request->font;
            $airline_brand->font_color_primary = $request->font_color_primary;
            $airline_brand->font_color_secondary = $request->font_color_secondary;
            $airline_brand->fids_color = $request->fids_color;
            $airline_brand->ssbd_logo = $request->ssbd_logo;
            $airline_brand->logo_small_color = $request->logo_small_color;
            $airline_brand->logo_large_color = $request->logo_large_color;
            $airline_brand->lids_logo_large = $request->lids_logo_large;
            $airline_brand->endcap_fids_logo_small_color = $request->endcap_fids_logo_small_color;
            $airline_brand->wayfinding_arrow_color = $request->wayfinding_arrow_color;
            $airline_brand->save();

            $message = 'Airline added successfully, please continue to add branding, logos and labels.';

            return redirect()->route('airlines.edit', $airline->id);
        } catch (Exception $e) {
            $message = 'There was a problem adding new airline. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $airlines_basic = AirlinesBasic::findOrFail($id);
            $airlines_branding = $airlines_basic->airlinesBranding;
            $airlines_labels_lid = $airlines_basic->airlinesLabelsLids;
        } catch (Exception $e) {
            $message = 'There was a problem getting the airline and associate resources. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }

        return Inertia::render(
            'Airlines/EditAirlines',
            [
                'airlines_basic' => $airlines_basic,
                'airlines_branding' => ($airlines_branding) ? $airlines_branding : new stdClass(),
                'airlines_labels_lid' => ($airlines_labels_lid) ? $airlines_labels_lid : new stdClass(),
                'canEditAirlines' => Gate::allows('airlines.edit'),
                'canEditLabels' => Gate::allows('airlines_labels_lids.update'),
                'canEditLogos' => Gate::allows('airlines_logos.update'),
                'canEditBranding' => Gate::allows('airlines_branding.update'),
                'isSuperAdmin' => Gate::allows('super-admin'),
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
                'status' => 'required|in:Active,Inactive',
            ]);

            $airlines_basic = AirlinesBasic::findOrFail($id);
            $airlines_basic->status = $request->status;
            $airlines_basic->save();

            $message = 'Airline status updated successfully.';

            return redirect()->back()->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem updating airline status. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        try {
            $airlines_basic = AirlinesBasic::findOrFail($id);
            $message = "Airline '{$airlines_basic->name}' deleted successfully.";

            $airlines_basic->airlinesLabelsLids()->delete();
            $airlines_basic->airlinesLabelsLids()->sync([]);

            // Deleting airline branding
            $airlines_basic->airlinesBranding()->delete();

            // Removing this airline's assignment from users
            $airlines_basic->users()->detach();

            // Deleting airline itself
            $airlines_basic->delete();

            return redirect()->back()->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem deleting airline. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }
}
