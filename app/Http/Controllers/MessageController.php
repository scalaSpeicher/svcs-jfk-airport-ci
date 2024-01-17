<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Template;
use App\Services\HelperMethods;
use Auth;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Illuminate\Container\Container;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

class MessageController extends Controller
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

        $messages = Message::with('templates')->where('new', false)
            ->when($request->input('search'), function ($query, $search): void {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhereHas('templates', function (Builder $query) use ($search): void {
                        $query->where('name', 'like', "%{$search}%");
                    });
                })->get();
            if ($request->input('sort')) {
                $sortOrder = 'ASC';
                $sortAttribute = $request->input('sort');
                if (strncmp($sortAttribute, '-', 1) === 0) {
                    $sortOrder = 'DESC';
                    $sortAttribute = mb_substr($sortAttribute, 1);
                }
                if ($sortOrder === 'DESC') {
                    $messages = $messages->sortByDesc($sortAttribute);
                } else {
                    $messages = $messages->sortBy($sortAttribute);
                }
            }
            $messages = $messages->toArray();
            $page = Paginator::resolveCurrentPage('page');
            $path = Paginator::resolveCurrentPath();
            $messages_this_page = array_slice($messages, ($itemsPerPage * ($page - 1)), $itemsPerPage);
            $container = Container::getInstance();
            $messagesPage = $container->makeWith(LengthAwarePaginator::class, [
                'items' => $messages_this_page,
                'total' => count($messages),
                'perPage' => $itemsPerPage,
                'currentPage' => $page,
                'options' => [
                    'path' => $path,
                    'pageName' => 'page',
                ],
            ])->withQueryString();

        return Inertia::render(
            'Messages/Index',
            [
                'messages' => $messagesPage,
                'templates' => Template::where('manifest_verified', 1)->get(),
                'canReadMessages' => Gate::allows('messages.index'),
                'canAddMessages' => Gate::allows('messages.create'),
                'canEditMessages' => Gate::allows('messages.edit'),
                'canUnlockMessages' => Gate::allows('messages.unlock'),
                'canDeleteMessages' => Gate::allows('messages.destroy'),
                'canDuplicateMessages' => Gate::allows('messages.duplicate'),
                'canRefreshMessages' => Gate::allows('messages.refresh'),
                'isSuperAdmin' => Gate::allows('super-admin'),
                'filters' => $request->only(['search']),
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        if (!Gate::allows('messages.create')) {
            $message = 'You do not have permission to create messages.';

            return redirect()->back()->with('message', $message);
        }
        try {
            $request->validate([
                'template_id' => 'required|integer',
                'name' => 'required|string|unique:messages,name',
                //'full_size' => 'required|in:full,split',
            ]);
            $template = Template::find($request->template_id);
            $playerMessageAndComponents = $template->generatePlayerMessageAndComponents($request->name);

            return Inertia::render(
                'Messages/EditMessages',
                [
                    'template' => $template,
                    'playerMessage' => $playerMessageAndComponents->message,
                    'messageComponents' => $playerMessageAndComponents->components,
                    'canReadMessages' => Gate::allows('messages.index'),
                    'canAddMessages' => Gate::allows('messages.create'),
                    'canEditMessages' => Gate::allows('messages.edit'),
                    'canRefreshMessages' => Gate::allows('messages.refresh'),
                    'formMode' => 'add',
                ]
            );
        } catch (Exception $e) {
            $message = $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        if (!Gate::allows('messages.edit')) {
            $message = 'You do not have permission to edit messages.';

            return redirect()->back()->with('message', $message);
        }
        try {
            $message = Message::find($message->id);
            if ($message->locked_by !== 0 && $message->locked_by !== Auth::user()->id) {
                return redirect()->back()->with('message', 'Message ID: ' . $message->id . ' is currently being edited by ' . $message->locked_by_email . '!');
            }
            $message->locked_by = Auth::user()->id;
            $message->save();
            $template = $message->templates()->first();
            $playerMessageAndComponents = $template->generatePlayerMessageAndComponents($message);

            return Inertia::render(
                'Messages/EditMessages',
                [
                    'template' => $template,
                    'playerMessage' => $playerMessageAndComponents->message,
                    'messageComponents' => $playerMessageAndComponents->components,
                    'canReadMessages' => Gate::allows('messages.index'),
                    'canAddMessages' => Gate::allows('messages.create'),
                    'canEditMessages' => Gate::allows('messages.edit'),
                    'canRefreshMessages' => Gate::allows('messages.refresh'),
                    'formMode' => 'edit',
                ]
            );
        } catch (Exception $e) {
            $message = $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $id)
    {
        if (!Gate::allows('messages.create')) {
            $message = 'You do not have permission to create messages.';

            return redirect()->back()->with('message', $message);
        }
        try {
            $request->validate([
                'name' => 'required|string|unique:messages,name',
            ]);
            $message = new Message();
            $message->json_data = $request->post();
            $message->preview_data = null;
            $message->locked_by = 0;
            $message->new = false;
            $message->save();
            $message->templates()->sync($id);

            $changes = [
                'model' => 'Messages',
                'action' => 'Created',
                'message_name' => $message->name,
                'template_name' => $message->templates()->first()->name,
            ];
            $this->helperMethodsObj->createAudit($message, $changes);

            $message = 'Message created successfully.';

            return redirect()->route('messages.index')->with('message', $message);
        } catch (Exception $e) {
            $message = $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        try {
            $message = Message::find($request->id);
            $request->validate([
                'name' => 'required|string|unique:messages,name,' . $message->id . ',id',
            ]);
            $message->json_data = $request->post();
            $message->preview_data = null;
            $message->locked_by = 0;
            $message->new = false;
            $message->save();

            $changes = [
                'model' => 'Messages',
                'action' => 'Updated',
                'message_name' => $message->name,
                'template_name' => $message->templates()->first()->name,
            ];
            $this->helperMethodsObj->createAudit($message, $changes);

            $message = 'Message updated successfully.';

            return redirect()->route('messages.index')->with('message', $message);
        } catch (Exception $e) {
            $message = $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    public function refresh(Request $request)
    {
        if (!Gate::allows('messages.refresh')) {
            $message = 'You do not have permission to refresh messages.';

            return redirect()->back()->with('message', $message);
        }
        try {
            $message = Message::find($request->id);
            $request->validate([
                'name' => 'required|string|unique:messages,name,' . $message->id . ',id',
            ]);
            if (!$message->new) {
                $message->preview_data = $message->json_data;
            }
            $message->json_data = $request->post();
            $message->locked_by = Auth::user()->id;
            $message->save();

            $changes = [
                'model' => 'Messages',
                'action' => 'Refreshed',
                'message_name' => $message->name,
                'template_name' => $message->templates()->first()->name,
            ];
            $this->helperMethodsObj->createAudit($message, $changes);

            $response = 'Preview refreshed.';

            return redirect()->route('messages.edit', ['message' => $message])->with('message', $response);
        } catch (Exception $e) {
            $response = $e->getMessage();

            return redirect()->route('messages.edit', ['message' => $message])->with('message', $response);
        }
    }

    public function unlock(Request $request)
    {
        if (!Gate::allows('messages.unlock')) {
            $message = 'You do not have permission to unlock messages.';

            return redirect()->back()->with('message', $message);
        }
        try {
            $message = Message::find($request->id);
            $message->preview_data = null;
            $message->locked_by = 0;
            $message->new = false;
            $message->save();

            $changes = [
                'model' => 'Messages',
                'action' => 'Unlocked',
                'message_name' => $message->name,
                'template_name' => $message->templates()->first()->name,
            ];
            $this->helperMethodsObj->createAudit($message, $changes);

            $response = 'Message unlocked.';

            return redirect()->route('messages.index')->with('message', $response);
        } catch (Exception $e) {
            $response = 'There was a problem unlocking message... ' . $e->getMessage();

            return redirect()->back()->with('message', $response);
        }
    }

    public function dupe(string $dupes)
    {
        if (!Gate::allows('messages.duplicate')) {
            $message = 'You do not have permission to duplicate messages.';

            return redirect()->back()->with('message', $message);
        }
        try {
            $dupeList = json_decode($dupes);
            foreach ($dupeList as $key => $value) {
                $message = Message::findOrFail($key);
                $newMessage = $message->replicate($except = ['name']);
                $nameDupeCheck = Message::where('name', $value)->first();
                if ($nameDupeCheck) {
                    $response = 'Message name already exists: ' . $value;

                    return redirect()->back()->with('message', $response);
                }
                $jsonData = $newMessage->json_data;
                $jsonData['name'] = $value;
                $newMessage->json_data = $jsonData;
                $newMessage->save();
                $newMessage->templates()->sync($message->templates()->first()->id);
                $changes = [
                    'model' => 'Messages',
                    'action' => 'Duplicated',
                    'message_name' => $message->name,
                    'template_name' => $message->templates()->first()->name,
                ];
                $this->helperMethodsObj->createAudit($message, $changes);
            }
            $response = 'Message duplication successfully.';

            return redirect()->route('messages.index')->with('message', $response);
        } catch (Exception $e) {
            $response = 'There was a problem duplicating messages... ' . $e->getMessage();

            return redirect()->back()->with('message', $response);
        }
    }

    public function destroy(string $trash)
    {
        if (!Gate::allows('messages.destroy')) {
            $message = 'You do not have permission to delete messages.';

            return redirect()->back()->with('message', $message);
        }
        try {
            $trashes = json_decode($trash);
            $key = array_keys($trashes);
            $size = count($key);
            for ($i = 0; $i < $size; $i++) {
                $deletion_id = json_decode(json_encode($trashes[$key[$i]]), true);
                $message = Message::findOrFail($deletion_id);
                $changes = [
                    'model' => 'Messages',
                    'action' => 'Deleted',
                    'message_name' => $message->name,
                    'template_name' => $message->templates()->first()->name,
                ];
                $this->helperMethodsObj->createAudit($message, $changes);
                $message->templates()->detach();
                $message->delete();
            }
            $response = 'Message removal successfully.';

            return redirect()->route('messages.index')->with('message', $response);
        } catch (Exception $e) {
            $response = 'There was a problem deleting messages. ' . $e->getMessage();

            return redirect()->back()->with('message', $response);
        }
    }

    public function cancel(string $id)
    {
        try {
            $message = Message::findOrFail($id);
            if ($message->new) {
                $message->templates()->detach();
                $message->delete();
                $response = 'Message creation cancelled.';

                return redirect()->route('messages.index')->with('message', $response);
            }
            $message->discardPreview();
            $message->preview_data = null;
            $message->locked_by = 0;
            $message->new = false;
            $message->save();
            $response = 'Preview updates discarded.';

            return redirect()->route('messages.index')->with('message', $response);
        } catch (Exception $e) {
            $response = 'There was a problem... ' . $e->getMessage();

            return redirect()->back()->with('message', $response);
        }
    }
}
