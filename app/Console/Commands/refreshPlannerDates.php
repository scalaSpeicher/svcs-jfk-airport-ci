<?php

namespace App\Console\Commands;

use App\Models\Planner;
use Illuminate\Console\Command;

class refreshPlannerDates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'planners:refresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Date refresh on Planners';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $planners = Planner::whereDate('checkin_plan_open_date_time', now()->subDays(1))
            ->get();
        foreach ($planners as $planner) {
            $openDate = $planner->checkin_plan_open_date_time;
            $closeDate = $planner->checkin_plan_close_date_time;
            $planner->checkin_plan_open_date_time =
                date('Y-m-d H:i:s', strtotime($openDate) + 60 * 60 * 24);
            $planner->checkin_plan_close_date_time =
                date('Y-m-d H:i:s', strtotime($closeDate) + 60 * 60 * 24);
            $planner->save();
        }
    }
}
