<?php

namespace App\Http\Controllers;

use App\Models\AirlinesBasic;
use App\Models\AirlinesBranding;
use App\Models\AirlinesLabelsLid;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AirlinesLabelsLidController extends Controller
{
    protected $helperMethods;

    protected $errorsFound = false;

    public function __construct(HelperMethods $helperMethods)
    {
        $this->helperMethods = $helperMethods;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'label_name' => 'required|string',
            'class_code' => 'required|string',
            'airline_id' => 'required|int',
        ]);

        try {
            $label = new AirlinesLabelsLid([
                'label' => $validatedData['label_name'],
                'class_code' => $validatedData['class_code'],
                'created_at' => now(),
                'created_by' => Auth::id(),
            ]);

            $label->save();

            AirlinesBasic::findOrFail($validatedData['airline_id'])->airlinesLabelsLids()->syncWithoutDetaching($label->id);

            $this->helperMethods->createAudit($label, [
                'model' => 'Airlines Labels Lids',
                'class_code' => $validatedData['class_code'],
                'name' => $validatedData['label_name'],
                'action' => 'Created',
            ]);
            $message = 'Airline Lids created successfully.';

            return redirect()->back()->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem creating the label. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $message = 'Airline Lids Updated: <br />';

            foreach ($request->airlines_labels_lids as $label) {
                $airlines_labels_lid = AirlinesLabelsLid::firstOrNew([
                    'id' => $label['id'],
                ]);

                // lid exists. dupe check on class_code and label
                $airlines_labels_lid_check = AirlinesBasic::findOrFail($id)->airlinesLabelsLids->toArray();
                foreach ($airlines_labels_lid_check as $label_check) {
                    if ($label['id'] !== $label_check['id']) {
                        if ($label['class_code'] == $label_check['class_code']) {
                            $message = ' &#x2717; Class code not unique on: ' . $label['label'] . '<br />';

                            return redirect()->back()->withErrors(['message' => $message]);
                        }
                        if ($label['label'] == $label_check['label']) {
                            $message = ' &#x2717; Label not unique on: ' . $label['label'] . '<br />';

                            return redirect()->back()->withErrors(['message' => $message]);
                        }
                    }
                }
                $airlines_labels_lid->class_code = $label['class_code'];
                $airlines_labels_lid->label = $label['label'];
                $airlines_labels_lid->save();
                $message .= ' &#x2713; LID updated successfully: ' . $label['label'] . '<br />';
            }

            $airlines_branding = AirlinesBranding::firstOrNew([
                'airlines_basic_id' => $id,
            ]);
            $airlines_branding->lids_background_color = $request->background_color;
            $airlines_branding->lids_status_bar_color = $request->status_bar_color;
            $airlines_branding->updated_at = date('Y-m-d H:i:s');
            $airlines_branding->updated_by = Auth::user()->id;
            $airlines_branding->save();

            $message .= ' &#x2713; Background Color: ' . $request->background_color . '<br />';
            $message .= ' &#x2713; Status Bar Color: ' . $request->status_bar_color . '<br />';

            return redirect()->back()->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem updating airline lids information. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    public function destroy(string $id)
    {
        try {
            $airlines_labels_lid = AirlinesLabelsLid::findOrFail($id);
            $this->helperMethods->createAudit($airlines_labels_lid, [
                'model' => 'Airlines Labels Lids',
                'class_code' => $airlines_labels_lid->class_code,
                'name' => $airlines_labels_lid->label,
                'action' => 'Deleted',
            ]);
            $airlines_labels_lid->airlines()->detach();
            $airlines_labels_lid->delete();
            $message = 'Airline Lids deleted successfully.';

            return redirect()->back()->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem deleting airline lids. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }
}
