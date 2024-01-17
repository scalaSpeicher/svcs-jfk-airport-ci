<?php

namespace App\Http\Controllers;

use App\Models\Template;
use App\Rules\DomainRule;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use stdClass;
use Storage;

class TemplateController extends Controller
{
    protected $helperMethodsObj;

    public function __construct(HelperMethods $helperMethodsObj)
    {
        $this->helperMethodsObj = $helperMethodsObj;
    }

    public function index(Request $request)
    {
        $itemsPerPage = $this->helperMethodsObj->getItemsPerPageCookie($request);
        $templates = Template::with('messages')
            ->when($request->input('search'), function ($query, $search): void {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
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
            'Templates/Index',
            [
                'templates' => $templates,
                'canReadTemplates' => Gate::allows('templates.index'),
                'canAddTemplates' => Gate::allows('templates.create'),
                'canEditTemplates' => Gate::allows('templates.edit'),
                'canDeleteTemplates' => Gate::allows('templates.destroy'),
                'isSuperAdmin' => Gate::allows('super-admin'),
                'filters' => $request->only(['search']),
            ]
        );
    }

    public function create()
    {
        return Inertia::render(
            'Templates/EditTemplates',
            [
                'templates' => new stdClass(),
                'templateFields' => new stdClass(),
                'canReadTemplates' => Gate::allows('templates.index'),
                'canAddTemplates' => Gate::allows('templates.create'),
                'canEditTemplates' => Gate::allows('templates.edit'),
                'formMode' => 'add',
            ]
        );
    }

    public function verifyManifestTest(Request $request)
    {
        try {
            $manifestFile = Storage::disk('public')->get('fubar.json');
            $manifest = json_decode($manifestFile);
            $manifestErrors = $this->verifyManifest($manifest);
            $errorString = '<br> - ' . implode('<br> - ', $manifestErrors);

            Template::create([
                'name' => $manifest->name,
                'description' => $manifest->description,
                'category' => $manifest->category,
                'full_url' => $request->full_url,
                'manifest_verified' => (empty($manifestErrors)) ? true : false,
                'manifest_errors' => (empty($manifestErrors)) ? null : $errorString,
                'thumbnail' => null,
            ]);

            $message = (empty($manifestErrors)) ? 'Template updated & manifest successfully linked.' : 'There are errors with the manifest...';

            return redirect()->route('templates.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem creating template...<br />' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    public function storeByUrl(Request $request)
    {
        if (!Gate::allows('templates.create')) {
            $message = 'You do not have permission to create templates.';

            return redirect()->back()->with('message', $message);
        }
        if ($request->full_url === 'verify') {

            return $this->verifyManifestTest($request);
        }

        try {
            $request->validate([
                'full_url' => ['required', new DomainRule()],
            ]);
        } catch (Exception $e) {
            $message = 'There was a problem creating template:<br />&nbsp;&bull;&nbsp;There is an issue validating the URL<br />&nbsp;&bull;&nbsp;Please try a different URL';

            return redirect()->back()->with('message', $message);
        }

        try {
            $manifest = null;
            $thumbnail = null;
            if (isset($request->full_url)) {
                if ($request->has('full_url')) {
                    $file_path = rtrim($request->full_url, '/') . '/manifest.json';
                } else {
                    throw ValidationException::withMessages(['full_url' => 'The URL is required.']);
                }
                $handle = fopen($file_path, 'r');
                $manifest = (!$handle) ? null : $file_path;
                if (!$manifest) {
                    throw ValidationException::withMessages(['full_url' => 'There was a problem with the URL!']);
                }
                $handle = file_get_contents($file_path);
                $manifest = json_decode($handle);
                $thumb_path = rtrim($request->full_url, '/') . '/thumbnail.jpg';
                $handleThumb = fopen($thumb_path, 'r');
                $thumbnail = (!$handleThumb) ? null : $thumb_path;
            }

            if ($manifest) {
                $manifestErrors = $this->verifyManifest($manifest);
                $errorString = '<br> - ' . implode('<br> - ', $manifestErrors);

                $template = Template::create([
                    'name' => $manifest->name,
                    'description' => $manifest->description,
                    'category' => $manifest->category,
                    'full_url' => $request->full_url,
                    'manifest_verified' => (empty($manifestErrors)) ? true : false,
                    'manifest_errors' => (empty($manifestErrors)) ? null : $errorString,
                    'thumbnail' => $thumbnail,
                ]);
            } else {
                throw ValidationException::withMessages(['full_url' => 'The was a problem with the URL provided.']);
            }

            $changes = [
                'model' => 'Templates',
                'action' => 'Created',
                'template_name' => $manifest->name,
            ];
            $this->helperMethodsObj->createAudit($template, $changes);

            $message = (empty($manifestErrors)) ? 'Template updated & manifest successfully linked.' : 'There are errors with the manifest...';

            return redirect()->route('templates.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem creating template...<br />' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    public function store(Request $request)
    {
        if (!Gate::allows('templates.create')) {
            $message = 'You do not have permission to create templates.';

            return redirect()->back()->with('message', $message);
        }
        if ($request->store_by_url) {
            return $this->storeByUrl($request);
        }

        try {
            $request->validate([
                'name' => 'required|string',
                'category' => 'required|string',
                'full_url' => ['required', new DomainRule()],
            ]);

            $template = Template::create($request->post());

            $changes = [
                'model' => 'Templates',
                'action' => 'Created',
                'template_name' => $request->name,
            ];
            $this->helperMethodsObj->createAudit($template, $changes);

            if (isset($request->thumbnail)) {
                $template->updateThumbnailPhoto($request->thumbnail);
            }

            if (isset($request->manifest)) {
                $template->updateManifest($request->manifest);
            }

            if (isset($request->create_manifest)) {
                //TODO: add switch for manifest creation when creator is complete in phase 2
                $template->createManifest();
            }

            if (isset($request->full_url)) {
                $file_path = rtrim($request->full_url, '/') . '/manifest.json';
                $handle = fopen($file_path, 'r');
                $manifest = (!$handle) ? false : $file_path;
                if (!$manifest) {
                    throw ValidationException::withMessages(['full_url' => 'The was a problem with the URL provided.']);
                }
            }

            $fields = $request->fields;
            $template->fields()->sync($fields);

            $message = 'Template created & manifest successfully linked.';

            return redirect()->route('templates.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem creating template...<br />' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    public function removeThumb(Request $request, string $id)
    {
        try {
            $template = Template::find($id);
            $template->deleteThumbnailPhoto();
            $message = 'Template thumbnail removed successfully.';

            return redirect()->back()->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem removing template thumbnail... ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    public function edit(Template $template)
    {
        return Inertia::render(
            'Templates/EditTemplates',
            [
                'templates' => $template,
                'templateFields' => $template->fields,
                'canReadTemplates' => Gate::allows('templates.index'),
                'canAddTemplates' => Gate::allows('templates.create'),
                'canEditTemplates' => Gate::allows('templates.edit'),
                'canDeleteTemplates' => Gate::allows('templates.destroy'),
                'formMode' => 'edit',
            ]
        );
    }

    public function update(Request $request)
    {
        if (!Gate::allows('templates.edit')) {
            $message = 'You do not have permission to update templates.';

            return redirect()->back()->with('message', $message);
        }
        try {
            $request->validate([
                'name' => 'required|string|unique:templates,name,' . $request->id . ',id',
                'category' => 'required|string',
                'full_url' => ['required', new DomainRule()],
            ]);

            $template = Template::find($request->id);
            $template->name = $request->name;
            $template->description = $request->description;
            $template->category = $request->category;

            if (isset($request->full_url)) {
                if ($request->has('full_url')) {
                    $file_path = rtrim($request->full_url, '/') . '/manifest.json';
                } else {
                    throw ValidationException::withMessages(['full_url' => 'The URL is required.']);
                }
                $handle = fopen($file_path, 'r');
                $manifest = (!$handle) ? null : $file_path;
                if (!$manifest) {
                    throw ValidationException::withMessages(['full_url' => 'There was a problem with the URL!']);
                }
                $handle = file_get_contents($file_path);
                $manifest = json_decode($handle);
                $thumb_path = rtrim($request->full_url, '/') . '/thumbnail.jpg';
                $handleThumb = fopen($thumb_path, 'r');
                $thumbnail = (!$handleThumb) ? null : $thumb_path;
                if ($manifest) {
                    $manifestErrors = $this->verifyManifest($manifest);
                    $errorString = '<br> - ' . implode('<br> - ', $manifestErrors);
                    $template->manifest_errors = (empty($manifestErrors)) ? null : $errorString;
                    $template->manifest_verified = (empty($manifestErrors)) ? true : false;
                    $template->thumbnail = $thumbnail;
                }
            }

            $template->full_url = $request->full_url;

            $changes = [
                'model' => 'Templates',
                'action' => 'Updated',
                'template_name' => $template->name,
            ];
            $this->helperMethodsObj->createAudit($template, $changes);

            if (isset($request->fields)) {
                $fields = $request->fields;
                $syncFields = collect($fields)->pluck('id')->toArray();
                $template->fields()->sync($syncFields);
            }

            $template->save();

            $message = (empty($manifestErrors)) ? 'Template updated & manifest successfully linked.' : 'There are errors with the manifest...';

            return redirect()->route('templates.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem updating template!<br />' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    public function destroy(string $trash)
    {
        if (!Gate::allows('templates.destroy')) {
            $message = 'You do not have permission to delete templates.';

            return redirect()->back()->with('message', $message);
        }
        try {
            $trashes = json_decode($trash);
            $key = array_keys($trashes);
            $size = count($key);
            for ($i = 0; $i < $size; $i++) {
                $deletion_id = json_decode(json_encode($trashes[$key[$i]]), true);
                $template = Template::findOrFail($deletion_id);
                $messages = $template->messages;
                $changes = [
                    'model' => 'Templates',
                    'action' => 'Deleted',
                    'template_name' => $template->name,
                ];
                $this->helperMethodsObj->createAudit($template, $changes);
                $template->messages()->detach();
                $messages->each(function ($message): void {
                    $message->delete();
                });
                $template->delete();
            }
            $message = 'Removal successfully.';

            return redirect()->back()->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem deleting templates. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    private function verifyManifest(stdClass $manifest): array
    {
        $errors = [];
        foreach ($manifest->configTypes as $messageField) {
            $internal = property_exists($messageField, 'internal') ? $messageField->internal : false;
            $fieldType = $fieldName = null;

            if (!property_exists($messageField, 'type')) {
                $errors[] = 'Type is missing on a field.';
            } else {
                $fieldType = mb_strtolower($messageField->type);
                if (!in_array($fieldType, ['font', 'number', 'textarea', 'text', 'select', 'toggle', 'airlines-select', 'input', 'picker'])) {
                    $errors[] = 'Type is invalid on a field.';
                }
            }
            if (!property_exists($messageField, 'name')) {
                $errors[] = 'Name is missing on a ' . $fieldType . ' field.';
            } else {
                $fieldName = mb_strtolower($messageField->name);
            }
            if (!property_exists($messageField, 'label') && !$internal) {
                $errors[] = 'Label is missing on a ' . $fieldType . ' field.';
            }
            if (!property_exists($messageField, 'readonly')) {
                $errors[] = 'Readonly is missing on a ' . $fieldType . ' field.';
            }
            if (!property_exists($messageField, 'default') && $messageField->type !== 'font' && $messageField->type !== 'airlines-select') {
                $errors[] = 'Default is missing on a ' . $fieldType . ' field.';
            }
            if (!property_exists($messageField, 'required')) {
                $errors[] = 'Required is missing on a ' . $fieldType . ' field.';
            }
            if ($internal) {
                continue;
            }

            switch (mb_strtolower($fieldType)) {
                case 'font':
                    if (!property_exists($messageField, 'color') || !property_exists($messageField->color, 'default')) {
                        $errors[] = ($fieldName !== null) ? 'Font color has an issue on ' . $fieldName : 'Font color has an issue on a field.';
                    }
                    if (!property_exists($messageField, 'family') || !property_exists($messageField->family, 'options')) {
                        $errors[] = ($fieldName !== null) ? 'Font family has an issue on ' . $fieldName : 'Font family has an issue on a field.';
                    } else {
                        $defaultFound = false;
                        foreach ($messageField->family->options as $option) {
                            $defaultFound = property_exists($option, 'default');
                            if ($defaultFound) {
                                break;
                            }
                        }
                        if (!$defaultFound) {
                            $errors[] = ($fieldName !== null) ? 'Font family options has an issue on ' . $fieldName : 'Font family options has an issue on a field.';
                        }
                    }
                    if (!property_exists($messageField, 'size')) {
                        $errors[] = ($fieldName !== null) ? 'Font size has an issue on ' . $fieldName : 'Font size has an issue on a field.';
                    } else {
                        if (!property_exists($messageField->size, 'min') || !property_exists($messageField->size, 'max') || !property_exists($messageField->size, 'default')) {
                            $errors[] = ($fieldName !== null) ? 'Font size min, max, or default has an issue on ' . $fieldName : 'Font size min, max, or default has an issue on a field.';
                        }
                    }
                    if (!property_exists($messageField, 'weight')) {
                        $errors[] = ($fieldName !== null) ? 'Font weight has an issue on ' . $fieldName : 'Font weight has an issue on a field.';
                    } else {
                        if (!property_exists($messageField->weight, 'min') || !property_exists($messageField->weight, 'max') || !property_exists($messageField->weight, 'default')) {
                            $errors[] = ($fieldName !== null) ? 'Font weight min, max, or default has an issue on ' . $fieldName : 'Font weight min, max, or default has an issue on a field.';
                        }
                    }
                    break;
                case 'number':
                    if (!property_exists($messageField, 'min') || !property_exists($messageField, 'max') || !property_exists($messageField, 'default')) {
                        $errors[] = ($fieldName !== null) ? 'Number size min, max, or default has an issue on ' . $fieldName : 'Number size min, max, or default has an issue on a field.';
                    }
                    break;
                case 'textarea':
                    if (!property_exists($messageField, 'rows')) {
                        $errors[] = ($fieldName !== null) ? 'Textarea rows has an issue on ' . $fieldName : 'Textarea rows has an issue on a field.';
                    }
                    break;
                case 'select':
                case 'toggle':
                    if (!property_exists($messageField, 'options')) {
                        $errors[] = ($fieldName !== null) ? 'Select or toggle options has an issue on ' . $fieldName : 'Select or toggle options has an issue on a field.';
                    } else {
                        $defaultFound = false;
                        foreach ($messageField->options as $option) {
                            $defaultFound = property_exists($option, 'default');
                            if ($defaultFound) {
                                break;
                            }
                        }
                        if (!$defaultFound) {
                            $errors[] = ($fieldName !== null) ? 'Select or toggle options default has an issue on ' . $fieldName : 'Select or toggle options default has an issue on a field.';
                        }
                    }
                    break;
                case 'airlines-select':
                    if (!property_exists($messageField, 'min') || !property_exists($messageField, 'max')) {
                        $errors[] = ($fieldName !== null) ? 'Airlines-select min or max has an issue on ' . $fieldName : 'Airlines-select min or max has an issue on a field.';
                    }
                    break;
                default:
                    break;
            }
        }

        return $errors;
    }
}
