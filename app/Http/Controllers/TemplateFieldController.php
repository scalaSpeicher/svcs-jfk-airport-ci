<?php

namespace App\Http\Controllers;

use App\Models\Template;
use App\Models\TemplateField;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use stdClass;

class TemplateFieldController extends Controller
{
    protected $helperMethodsObj;

    public function __construct(HelperMethods $helperMethodsObj)
    {
        $this->helperMethodsObj = $helperMethodsObj;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(
            'Templates/EditTemplates',
            [
                'template' => new stdClass(),
                'templateField' => new stdClass(),
                'canReadTemplates' => Gate::allows('templates.index'),
                'canAddTemplates' => Gate::allows('templates.create'),
                'canEditTemplates' => Gate::allows('templates.edit'),
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
                'name' => 'required|string|max:255',
                'type' => 'required|string|max:255',
                'label' => 'required|string|max:255',
                'required' => 'required|boolean',
                'data_field' => 'nullable|array',
                'max' => 'nullable|integer',
                'min' => 'nullable|integer',
                'lines' => 'nullable|integer',
                'default' => 'nullable|string|max:255',
            ]);

            $field = TemplateField::create($request->post());
            $template = Template::find($request->post('template_id'));
            $template->fields()->syncWithoutDetaching($field->id);

            $message = 'Template field created successfully.';

            return redirect()->back()->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem creating template field. ' . $e->getMessage();

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

            return redirect()->route('templates.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem... ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TemplateField $templateField)
    {
        try {

            $message = '';

            return redirect()->route('templates.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem... ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }
}
