<?php

namespace App\Console\Commands;

use App\Models\ManualOverride;
use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CleanRecordsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clean-records';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cleans old records and orphans from the database.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $messagesCutoff = Carbon::now()->subHours(1);
        $overridesCutoff = Carbon::now()->subDays(7);
        $overrides = ManualOverride::where('created_at', '<', $overridesCutoff)->get();
        foreach ($overrides as $override) {
            $override->delete();
        }
        $messages = Message::where('updated_at', '<', $messagesCutoff)
            ->where('new', 1)
            ->orWhere('locked_by', '<>', 0)
            ->get();
        foreach ($messages as $message) {
            if ($message->new) {
                $message->templates()->detach();
                $message->delete();
            } elseif ($message->locked_by !== 0) {
                $message->locked_by = 0;
                $message->preview_data = null;
                $message->save();
            }
        }

        $this->info('Overrides and messages cleaned.');
    }
}
