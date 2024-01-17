<?php

namespace App\Http\Controllers;

use App\Models\AirlinesBasic;
use App\Models\AirlinesBranding;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class AirlinesBrandingController extends Controller
{
    protected $helperMethodsObj;

    public function __construct()
    {
        $this->helperMethodsObj = new HelperMethods();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $airlines_branding = new AirlinesBranding();
            $airline = AirlinesBasic::findOrFail($request->airline_id);
            $airlines_branding->airlines_basic_id = $airline->id;
            $airlines_branding->mode = $request->mode;
            $airlines_branding->primary_color = $request->primary_color;
            $airlines_branding->secondary_color = $request->secondary_color;
            $airlines_branding->tertiary_color = $request->tertiary_color;
            $airlines_branding->font = $request->font;
            $airlines_branding->font_color_primary = $request->font_color_primary;
            $airlines_branding->font_color_secondary = $request->font_color_secondary;
            $airlines_branding->fids_color = $request->fids_color;
            $airlines_branding->ssbd_logo = $request->ssbd_logo;
            $airlines_branding->logo_small_color = $request->logo_small_color;
            $airlines_branding->logo_large_color = $request->logo_large_color;
            $airlines_branding->lids_logo_large = $request->lids_logo_large;
            $airlines_branding->endcap_fids_logo_small_color = $request->endcap_fids_logo_small_color;
            $airlines_branding->wayfinding_arrow_color = $request->wayfinding_arrow_color;
            $airlines_branding->save();
            $airline->airlinesBranding()->syncWithoutDetaching($airlines_branding->id);

            $message = 'New airline branding added successfully.';

            // return redirect()->back()->with('message', $message);
            return redirect()->route('airlines.edit', $request->airline_id);
        } catch (Exception $e) {
            $message = 'There was a problem adding new airline branding. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if ($request->form_name == 'airline_logos') {
            return $this->updateLogo($request, $id);
        }
        try {
            $request->validate([
                'mode' => 'required|in:Light,Dark',
            ]);

            $airlines_branding = AirlinesBranding::firstOrNew([
                'airlines_basic_id' => $id,
            ]);
            $airlines_branding->mode = $request->mode;
            $airlines_branding->primary_color = $request->primary_color;
            $airlines_branding->secondary_color = $request->secondary_color;
            $airlines_branding->tertiary_color = $request->tertiary_color;
            $airlines_branding->font = $request->font;
            $airlines_branding->font_color_primary = $request->font_color_primary;
            $airlines_branding->font_color_secondary = $request->font_color_secondary;
            $airlines_branding->fids_color = $request->fids_color;
            $airlines_branding->updated_at = date('Y-m-d H:i:s');
            $airlines_branding->updated_by = Auth::user()->id;
            $airlines_branding->save();

            $changes = [
                'model' => 'Airlines Branding',
                'request' => $request->all(),
            ];
            $this->helperMethodsObj->createAudit($airlines_branding, $changes);

            $message = 'Airlines branding updated successfully.';

            return redirect()->back()->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem updating airline branding. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    public function processLogoUploads(Request $request, string $airline_id): void
    {
        $logoTypes = [
            'ssbd_logo' => 'SSBD_3168px_Logo.png',
            'logo_small_color' => 'Wayfinding_Small_Logo.png',
            'logo_large_color' => 'Wayfinding_Medium_Logo.png',
            'lids_logo_large' => 'Check_In_Counter_Logo.png',
            'endcap_fids_logo_small_color' => 'Endcap_FIDS_Small_Logo.png',
            'wayfinding_arrow_color' => 'Endcap_Wayfinding_Arrow_Logo.png',
        ];

        foreach ($logoTypes as $field => $type) {
            if ($request->{$field}) {
                $fileName = ucfirst(str_replace(' ', '_', AirlinesBasic::find($airline_id)->name)) . '_' . $type;
                $this->saveLogo($request, $field, $request->{$field}, $fileName, $airline_id);
            }
        }
    }

    public function saveLogo(Request $request, string $field, string $encodedLogo, string $fileName, string $airline_id): void
    {
        $image = imagecreatefromstring(file_get_contents($encodedLogo));

        $this->validateLogo($image, $field);

        $data = explode(',', $encodedLogo)[1];
        $decodedData = base64_decode($data);

        Storage::disk('public')->put('/airlines_branding_seed_data/' . $field . '/' . $fileName, $decodedData);

        $airlines_branding = AirlinesBranding::firstOrNew([
            'airlines_basic_id' => $airline_id,
        ]);
        $airlines_branding->{$field} = $field . '/' . $fileName;
        $airlines_branding->updated_at = date('Y-m-d H:i:s');
        $airlines_branding->updated_by = Auth::user()->id;
        $airlines_branding->save();
    }

    /**
     * Validates given image dimension
     *
     * @param [type] $image
     * @param [type] $field
     */
    public function validateLogo($image, $field)
    {
        try {
            $validDimensions = match ($field) {
                'ssbd_logo' => ['width' => '3168', 'height' => '360'],
                'logo_small_color' => ['width' => '55', 'height' => '55'],
                'logo_large_color' => ['width' => '214', 'height' => '55'],
                'lids_logo_large' => ['width' => '710', 'height' => '360'],
                'endcap_fids_logo_small_color' => ['width' => '37', 'height' => '37'],
                'wayfinding_arrow_color' => ['width' => '55', 'height' => '55'],
            };

            if (imagesx($image) != $validDimensions['width'] || imagesy($image) != $validDimensions['height']) {
                throw new ValidationException("Invalid dimensions for logo {$field}. Please upload with dimensions {$validDimensions['width']}x{$validDimensions['height']}.");
            }
        } catch (Exception $e) {
            $message = 'There was a problem updating airline logos. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    private function updateLogo(Request $request, string $id)
    {
        try {
            $this->processLogoUploads($request, $id);

            return redirect()->back()->withMessage('Airline logos updated successfully.');
        } catch (Exception $e) {
            $message = 'There was a problem updating airline logos. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }
}
