<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\User;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class PermissionController extends Controller
{
    protected HelperMethods $helperMethodsObj;

    protected $allowedPerms = [
        'airlines', 'audits', 'branding', 'planners', 'counters',
        'destinations', 'labels', 'roles', 'teams', 'users',
    ];

    public function __construct(HelperMethods $helperMethodsObj)
    {
        $this->helperMethodsObj = $helperMethodsObj;
    }

    public function index(Request $request)
    {
        $user = Auth::user();
        $permissions = $user->getDirectPermissions()->pluck('id')->toArray();
        $allPerms = Permission::pluck('id');

        $currentPerms = [];
        $allPerms->each(function ($item) use (&$currentPerms, $permissions): void {
            $currentPerms[$item] = in_array($item, $permissions) ? 'true' : 'false';
        });

        $permissions = Permission::get(['id', 'name']);
        $perms = [];

        $permissions->each(function ($item) use (&$perms): void {
            $permSplit = explode('.', $item->name);
            if (count($permSplit) > 1 && in_array($permSplit[0], $this->allowedPerms)) {
                $perms[$permSplit[0]][$permSplit[1]] = $item->id;
            }
        });

        $permissionsData = [
            'permissions' => $perms,
            'currentPerms' => $currentPerms,
            'user' => $user,
            'userRole' => $user->getRoleNames()[0] ?? '',
            'canReadPermissions' => Gate::allows('permissions.index'),
            'canAddPermissions' => Gate::allows('permissions.create'),
            'canEditPermissions' => Gate::allows('permissions.edit'),
            'canDeletePermissions' => Gate::allows('permissions.destroy'),
            'isSuperAdmin' => Gate::allows('super-admin'),
        ];

        return Inertia::render('Permissions/Index', $permissionsData);
    }

    public function edit(string $id)
    {
        $user = User::findOrFail($id);
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        $permissions = $user->getDirectPermissions()->pluck('id')->toArray();

        $allPerms = Permission::pluck('id');

        $currentPerms = [];
        $allPerms->each(function ($item) use (&$currentPerms, $permissions): void {
            $currentPerms[$item] = in_array($item, $permissions) ? 'true' : 'false';
        });

        $permissions = Permission::get(['id', 'name']);
        $perms = [];

        $permissions->each(function ($item) use (&$perms): void {
            $permSplit = explode('.', $item->name);
            if (count($permSplit) > 1 && in_array($permSplit[0], $this->allowedPerms)) {
                $perms[$permSplit[0]][$permSplit[1]] = $item->id;
            }
        });

        $permissionsData = [
            'permissions' => $perms,
            'currentPerms' => $currentPerms,
            'user' => $user,
            'userRole' => $user->getRoleNames()[0] ?? '',
            'canReadPermissions' => Gate::allows('permissions.index'),
            'canAddPermissions' => Gate::allows('permissions.create'),
            'canEditPermissions' => Gate::allows('permissions.edit'),
            'canDeletePermissions' => Gate::allows('permissions.destroy'),
            'isSuperAdmin' => Gate::allows('super-admin'),
        ];

        return Inertia::render('Permissions/Index', $permissionsData);
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $message = 'Permissions updated successfully.';

            return redirect()->back()->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem updating permissions. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }
}
