<?php

namespace App\Http\Controllers;

use App\Models\AirlinesBasic;
use App\Models\User;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use stdClass;

class UserController extends Controller
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
        // $users = User::paginate(10);
        $itemsPerPage = $this->helperMethodsObj->getItemsPerPageCookie($request);
        $users = User::with('roles')
            ->when($request->input('search'), function ($query, $search): void {
                $query
                    ->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
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

        // foreach ($users as $key => $user) {
        //     $role = $user->getRoleNames();
        //     if (count($role)) {
        //         $users[$key]->role = $role[0];
        //     } else {
        //         $users[$key]->assignRole(2);
        //         $users[$key]->save();
        //         $users[$key]->role = 'user';
        //     }
        // }

        return Inertia::render(
            'Users/Index',
            [
                'users' => $users,
                'canReadUsers' => Gate::allows('users.index'),
                'canAddUsers' => Gate::allows('users.create'),
                'canEditUsers' => Gate::allows('users.edit'),
                'canDeleteUsers' => Gate::allows('users.destroy'),
                'canEditPermissions' => Gate::allows('permissions.edit'),
                'isSuperAdmin' => Gate::allows('super-admin'),
                'filters' => $request->only(['search']),
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Getting all airlines
        $airlines = AirlinesBasic::all();
        $user = new stdClass();
        $user->{'selectedAirlines'} = [];
        $user->{'selectedRole'} = '';

        // Getting all roles
        if (Gate::allows('super-admin')) {
            $roleOptions = Role::all();
        } else {
            $roleOptions = Role::where('name', '!=', 'super-admin')->get();
        }

        return Inertia::render(
            'Users/EditUsers',
            [
                'user' => $user,
                'airlines' => $airlines,
                'roles' => $roleOptions,
                'canReadUsers' => Gate::allows('users.index'),
                'canAddUsers' => Gate::allows('users.create'),
                'canEditUsers' => Gate::allows('users.edit'),
                'canDeleteUsers' => Gate::allows('users.destroy'),
                'canEditPermissions' => Gate::allows('permissions.edit'),
                'isSuperAdmin' => Gate::allows('super-admin'),
                'formMode' => 'addUser',
            ]
        );
    }

    /**
     * Store a newly created user
     *
     * @param  StoreUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(User $user, Request $request)
    {
        try {
            $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'status' => 'required|in:Active,Inactive',
                'selectedRole' => 'required',
            ]);

            $request->merge(['password' => password_hash('@LetMeInJFK!', PASSWORD_DEFAULT)]); // to do - use rand()
            $user = User::create($request->post());
            $user->save();
            // Getting airlines IDs that needs to be assigned to user
            if (!$request->selectedAirlines) {
                $user->airlines()->detach();
            } else {
                $airlines = array_map(fn ($a) => $a['id'], $request->selectedAirlines);
                $user->airlines()->sync($airlines);
            }
            $user->roles()->detach();
            $user->assignRole($request->selectedRole);
            $user->save();

            $message = 'User created successfully.';

            return redirect()->route('users.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem creating user. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        // Getting all airlines and airlines set for this user
        $airlines = AirlinesBasic::all();
        $userAirlines = $user->airlines;
        $selectedAirlines = [];
        if ($userAirlines) {
            foreach ($userAirlines as $userAirline) {
                $selectedAirlines[] = [
                    'name' => $userAirline->name,
                    'id' => $userAirline->id,
                ];
            }
        }

        $user->{'selectedAirlines'} = $selectedAirlines;
        $user->{'selectedRole'} = $user->getRoleNames()->first();
        if (Gate::allows('super-admin')) {
            $roleOptions = Role::all();
        } else {
            $roleOptions = Role::where('name', '!=', 'super-admin')->get();
        }

        return Inertia::render(
            'Users/EditUsers',
            [
                'user' => $user,
                'airlines' => $airlines,
                'roles' => $roleOptions,
                'canReadUsers' => Gate::allows('users.index'),
                'canAddUsers' => Gate::allows('users.create'),
                'canEditUsers' => Gate::allows('users.edit'),
                'canDeleteUsers' => Gate::allows('users.destroy'),
                'canEditPermissions' => Gate::allows('permissions.edit'),
                'isSuperAdmin' => Gate::allows('super-admin'),
                'formMode' => 'editUser',
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        try {
            $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|email|unique:users,email,' . $user->id,
                'status' => 'required|in:Active,Inactive',
                'selectedRole' => 'required',
            ]);

            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->status = $request->status;
            $originalAirlines = $user->airlines->pluck('id')->toArray();
            $airlines = [];

            if (!$request->selectedAirlines) {
                $user->airlines()->detach();
            } else {
                $airlines = array_map(fn ($airline) => $airline['id'], $request->selectedAirlines);
                $user->airlines()->sync($airlines);
            }
            $user->save();
            $removedAirlines = array_diff(
                $originalAirlines,
                $airlines
            );
            $addedAirlines = array_diff(
                $airlines,
                $originalAirlines
            );
            $airlinesAddedAudit = (!empty($addedAirlines)) ? array_map(fn ($airline) => AirlinesBasic::findOrFail($airline)->name, $addedAirlines) : [];
            $airlinesRemovedAudit = (!empty($removedAirlines)) ? array_map(fn ($airline) => AirlinesBasic::findOrFail($airline)->name, $removedAirlines) : [];
            if (!empty($airlinesAddedAudit) || !empty($airlinesRemovedAudit)) {
                $changes = [
                    'model' => 'User Airlines',
                    'airlines_added' => implode(', ', $airlinesAddedAudit),
                    'airlines_removed' => implode(', ', $airlinesRemovedAudit),
                ];
                $this->helperMethodsObj->createAudit($user, $changes);
            }
            $originalRole = $user->roles->first();
            if ($originalRole !== $request->selectedRole) {
                $changes = [
                    'model' => 'User Role',
                    'old' => mb_strtoupper($originalRole),
                    'new' => mb_strtoupper($request->selectedRole),
                ];
                $this->helperMethodsObj->createAudit($user, $changes);
            }
            $user->roles()->detach();
            $user->assignRole($request->selectedRole);
            $user->push();

            $message = 'User updated successfully.';

            return redirect()->route('users.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem updating user. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            // Deleting user from roles list
            $user->roles()->detach();
            $user->delete();
            $message = 'User deleted successfully.';

            return redirect()->route('users.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem deleting user. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }
}
