<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    protected $accessModels = [
        'App\Models\AirlinesBasic',
        'App\Models\AirlinesBranding',
        'App\Models\AirlinesLabelsLid',
        'App\Models\AuditTrail',
        'App\Models\Counter',
        'App\Models\Planner',
        'App\Models\Destination',
        'App\Models\Permission',
        'App\Models\Role',
        'App\Models\Team',
        'App\Models\User',
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        foreach ($this->accessModels as $className) {
            $model = new $className();
            Permission::create(['name' => $model->permission_name . '.index']);
            Permission::create(['name' => $model->permission_name . '.create']);
            Permission::create(['name' => $model->permission_name . '.store']);
            Permission::create(['name' => $model->permission_name . '.edit']);
            Permission::create(['name' => $model->permission_name . '.update']);
            Permission::create(['name' => $model->permission_name . '.destroy']);
            // Permission::create(['name' => $model->permission_name . '.show']);
            // Permission::create(['name' => $model->permission_name . '.forcedelete']);
            // Permission::create(['name' => $model->permission_name . '.restore']);
        }

        // create roles and assign created permissions
        // $role = Role::create(['name' => 'super-admin'])
        //     ->givePermissionTo(Permission::all());
    }
}
