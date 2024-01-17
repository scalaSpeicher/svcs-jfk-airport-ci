<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use stdClass;

class RoleController extends Controller
{
    protected $helperMethodsObj;

    protected $role;

    protected $permission;

    protected $allowedPerms = [
        'airlines', 'audits', 'airlines_branding', 'planners', 'counters', 'overrides',
        'destinations', 'airlines_labels_lids', 'airlines_logos', 'roles', 'teams', 'users',
        'templates', 'locations', 'messages', 'schedules', 'tokens',
    ];

    protected $adminPerms = [
        'audits.index', 'roles.index', 'roles.create', 'roles.update', 'roles.edit', 'roles.store',
        'roles.destroy', 'roles.store', 'tokens.destroy', 'tokens.edit',
    ];

    public function __construct(HelperMethods $helperMethodsObj, Role $role, Permission $permission)
    {
        $this->helperMethodsObj = $helperMethodsObj;
        $this->role = $role;
        $this->permission = $permission;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $itemsPerPage = $request->get('itemsPerPage', 10) === 'All' ? PHP_INT_MAX : $request->get('itemsPerPage', 10);

        $roles = $this->role->query()
            ->when($request->input('sort'), function ($query, $sortAttribute): void {
                $sortOrder = startsWith($sortAttribute, '-') ? 'DESC' : 'ASC';
                $sortAttribute = ltrim($sortAttribute, '-');
                $query->orderBy($sortAttribute, $sortOrder);
            })
            ->paginate($itemsPerPage)
            ->withQueryString();

        $canReadRoles = Gate::check('roles.index');
        $canAddRoles = Gate::check('roles.create');
        $canEditRoles = Gate::check('roles.edit');
        $canDeleteRoles = Gate::check('roles.destroy');
        $isSuperAdmin = Gate::check('super-admin');

        return Inertia::render('Roles/Index', [
            'roles' => $roles,
            'canReadRoles' => $canReadRoles,
            'canAddRoles' => $canAddRoles,
            'canEditRoles' => $canEditRoles,
            'canDeleteRoles' => $canDeleteRoles,
            'isSuperAdmin' => $isSuperAdmin,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $role = new stdClass();
        $role->selectedUsers = [];
        $role->selectedPermissions = [];
        $rolePermissions = [];
        $allPerms = Permission::all()->whereNotIn('name', $this->adminPerms)->pluck('id');

        $currentPerms = [];
        $allPerms->each(function ($item) use (&$currentPerms, $rolePermissions): void {
            $currentPerms[$item] = in_array($item, $rolePermissions) ? 'true' : 'false';
        });
        $role->currentPerms = $currentPerms;
        $role->perms = $this->getRolePerms(false);

        return $this->formResponse($role, 'addRole');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|unique:permissions,name',
            ]);
            $request->merge([
                'name' => trim($request->name),
                'guard_name' => 'web',
                'team_id' => null,
            ]);

            $role = $this->role->create($request->post());
            $changes = [
                'model' => 'Created',
                'created' => $role->name,
            ];
            $this->helperMethodsObj->createAudit($role, $changes);
            $this->syncUsersAndPermissions($request, $role);
            $message = 'Role added successfully.';

            return redirect()->route('roles.index')->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem adding new role. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $role = $this->role->findOrFail($id)->refresh();
        $role->selectedUsers = $role->users()->get(['id', 'email'])->toArray();
        if ($role->name == 'super-admin') {
            $rolePermissions = $role->permissions()->pluck('id')->toArray();
            $allPerms = Permission::pluck('id');
        } else {
            $rolePermissions = $role->permissions()->whereNotIn('name', $this->adminPerms)->pluck('id')->toArray();
            $allPerms = Permission::all()->whereNotIn('name', $this->adminPerms)->pluck('id');
        }

        $currentPerms = [];
        $allPerms->each(function ($item) use (&$currentPerms, $rolePermissions): void {
            $currentPerms[$item] = in_array($item, $rolePermissions) ? 'true' : 'false';
        });
        $role->currentPerms = $currentPerms;
        $role->perms = $this->getRolePerms(($role->name == 'super-admin'));

        return $this->formResponse($role, 'editRole');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        try {
            $role->fill([
                'name' => trim($request->name),
                'guard_name' => 'web',
                'team_id' => null,
            ])->save();

            $this->syncUsersAndPermissions($request, $role);

            return redirect()->route('roles.index')->with('message', 'Role updated successfully.');
        } catch (Exception $e) {
            return redirect()->back()->with('message', 'There was a problem updating role. ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $role = $this->role->findOrFail($id);
            $changes = [
                'model' => 'Deleted',
                'deleted' => $role->name,
            ];
            if ($role->users()) {
                $role->users()->detach();
            }
            if ($role->permissions()) {
                $role->permissions()->detach();
            }
            $role->delete();

            $this->helperMethodsObj->createAudit($role, $changes);

            return redirect()->route('roles.index')->with('message', "Role '{$role->name}' deleted successfully.");
        } catch (Exception $e) {
            return redirect()->back()->with('message', 'There was a problem deleting role. ' . $e->getMessage());
        }
    }

    private function getRolePerms($admin = true)
    {
        if ($admin) {
            $permissions = Permission::all(['id', 'name']);
        } else {
            $permissions = Permission::all(['id', 'name'])->whereNotIn('name', $this->adminPerms);
        }
        $perms = [];

        $permissions->each(function ($item) use (&$perms): void {
            $permSplit = explode('.', $item->name);
            if (count($permSplit) > 1 && in_array($permSplit[0], $this->allowedPerms)) {
                $perms[$permSplit[0]][$permSplit[1]] = $item->id;
            }
        });

        // clunky manual re-order
        $planners = $perms['planners'];
        $branding = $perms['airlines_branding'];
        $label = $perms['airlines_labels_lids'];
        $logo = $perms['airlines_logos'];
        $team = $perms['teams'];
        $overrides = $perms['overrides'];
        $messages = $perms['messages'];
        unset($perms['airlines_branding'], $perms['airlines_labels_lids'], $perms['airlines_logos'], $perms['teams'], $perms['overrides'], $perms['planners'], $perms['messages']);

        $perms['planners'] = $planners;
        $perms['airlines_branding'] = $branding;
        $perms['airlines_labels_lids'] = $label;
        $perms['airlines_logos'] = $logo;
        $perms['overrides'] = $overrides;
        $perms['teams'] = $team;
        $perms['messages'] = $messages;

        if ($admin) {
            $audit = $perms['audits'];
            unset($perms['audits']);
            $perms['audits'] = $audit;
        }

        return $perms;

    }

    private function syncUsersAndPermissions(Request $request, Role $role)
    {
        try {
            DB::beginTransaction();
            $selectedUsers = collect($request->input('selectedUsers'))->keyBy('id');
            $roleUsers = $role->users->keyBy('id');
            $removedUsers = $roleUsers->diffKeys($selectedUsers);
            $addedUsers = $selectedUsers->diffKeys($roleUsers);
            $usersAddedAudit = $addedUsers->pluck('email')->toArray();
            $usersRemovedAudit = $removedUsers->pluck('email')->toArray();
            $removedUsers = $removedUsers->keys()->toArray();
            $addedUsers = $addedUsers->keys()->toArray();

            $changes = [];
            $requestPerms = $request->input('selectedPermissions');
            $permsGiven = [];
            $permsTaken = [];

            foreach ($requestPerms as $key => $value) {

                $perm = Permission::findOrFail($key)->name;
                if ($value === 'true') {
                    if (!$role->hasPermissionTo($perm)) {
                        $permsGiven[] = $perm;
                    }
                    $role->givePermissionTo($perm);
                } else {
                    if ($role->hasPermissionTo($perm)) {
                        $permsTaken[] = $perm;
                    }
                    $role->revokePermissionTo($perm);
                }
            }

            $role->save();

            $selectedUsers = $selectedUsers->keys()->toArray();
            $role->users()->sync($selectedUsers);
            $role->save();
            foreach ($addedUsers as $addedUser) {
                $user = User::findOrFail($addedUser);
                $user->roles()->sync($role->id);
                $user->save();
            }
            DB::commit();
            $role->fresh();
            if (!empty($permsGiven) || !empty($permsTaken)) {
                foreach ($roleUsers as $roleUser) {
                    if (!in_array($roleUser['id'], $removedUsers)) {
                        $user = User::findOrFail($roleUser['id']);
                        $user->roles()->sync($role->id);
                        $user->save();
                    }
                }
            }

            $changes = [
                'model' => 'Role Update',
                'perms_added' => implode(', ', $permsGiven),
                'perms_removed' => implode(', ', $permsTaken),
                'users_added' => implode(', ', $usersAddedAudit),
                'users_removed' => implode(', ', $usersRemovedAudit),
            ];
            $this->helperMethodsObj->createAudit($role, $changes);

        } catch (Exception $e) {
            DB::rollback();

            return redirect()->back()->with('message', 'There was a problem syncing users and permissions. ' . $e->getMessage());
        }
    }

    private function formResponse($role, $formMode)
    {
        // if (config('cache.model_caching')) {
        //     $permissionsOptions = Cache::remember('all_perm_options', 60 * 60 * 24 * 30, fn () => $this->permission->all(['id', 'name'])->toArray());
        // } else {
        //     $permissionsOptions = $this->permission->all(['id', 'name'])->toArray();
        // }

        // if (config('cache.model_caching')) {
        //     $usersOptions = Cache::remember('all_user_options', 60 * 60 * 24 * 30, fn () => User::all(['id', 'email'])->toArray());
        // } else {
        //     $usersOptions = User::all(['id', 'email'])->toArray();
        // }
        $permissionsOptions = $this->permission->all(['id', 'name'])->toArray();
        $usersOptions = User::all(['id', 'email'])->toArray();

        $canReadRoles = Gate::check('roles.index');
        $canAddRoles = Gate::check('roles.create');
        $canEditRoles = Gate::check('roles.edit');
        $canDeleteRoles = Gate::check('roles.destroy');
        $isSuperAdmin = Gate::check('super-admin');

        return Inertia::render('Roles/AddRole', [
            'role' => $role,
            'permissionsOptions' => $permissionsOptions,
            'usersOptions' => $usersOptions,
            'canReadRoles' => $canReadRoles,
            'canAddRoles' => $canAddRoles,
            'canEditRoles' => $canEditRoles,
            'canDeleteRoles' => $canDeleteRoles,
            'isSuperAdmin' => $isSuperAdmin,
            'formMode' => $formMode,
        ]);
    }
}
