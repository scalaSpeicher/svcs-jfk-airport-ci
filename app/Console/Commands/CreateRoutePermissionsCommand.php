<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;

class CreateRoutePermissionsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'permission:create-permission-routes';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a permission routes.';

    protected $routeBlocks = [
        'login',
        'logout',
        'password',
        'profile',
        'register',
        'sanctum',
    ];

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $routes = Route::getRoutes()->getRoutes();
        foreach ($routes as $route) {
            $routePrefix = $route->getName();
            if (!str_contains($routePrefix, '-')) {
                if (str_contains($routePrefix, '.')) {
                    $routePrefix = explode('.', $routePrefix)[0];
                }

                if ($route->getName() !== ''
                    && !in_array($routePrefix, $this->routeBlocks)
                    && $route->getAction()['middleware']['0'] === 'web') {

                    $permission = Permission::where('name', $route->getName())->first();

                    if ($permission === null && $route->getName()) {
                        permission::create(['name' => $route->getName()]);
                    }
                }
            }
        }
        $this->info('Permission routes added successfully.');
    }
}
