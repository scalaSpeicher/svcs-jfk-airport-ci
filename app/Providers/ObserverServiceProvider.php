<?php

namespace App\Providers;

use App\Models\AirlinesBasic;
use App\Models\AirlinesBranding;
use App\Models\AirlinesLabelsLid;
use App\Models\Counter;
use App\Models\Destination;
use App\Models\Membership;
use App\Models\Permission;
use App\Models\Planner;
use App\Models\Role;
use App\Models\Team;
use App\Models\User;
use App\Observers\AuditObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class ObserverServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    }

    public function boot(): void
    {
        self::registerAuditObserver();
    }

    private static function registerAuditObserver(): void
    {
        /** @var Model[] $MODELS */
        $MODELS = [
            AirlinesBasic::class,
            AirlinesBranding::class,
            AirlinesLabelsLid::class,
            Counter::class,
            Planner::class,
            Destination::class,
            Membership::class,
            Permission::class,
            Role::class,
            Team::class,
            User::class,
        ];

        foreach ($MODELS as $MODEL) {
            $MODEL::observe(AuditObserver::class);
        }
    }
}
