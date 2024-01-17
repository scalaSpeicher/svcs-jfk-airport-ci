<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\App;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        if (!App::environment('local')) {
            // $schedule->command('inspire')->hourly();
            $schedule->command('app:update-counters')->withoutOverlapping()->everyMinute()->runInBackground();
            $schedule->command('app:maintain-soap')->withoutOverlapping()->everyMinute()->runInBackground();
            $schedule->command('app:cancel-soap')->dailyAt('06:00');
        }
        $schedule->command('app:clean-records')->everyThirtyMinutes();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
