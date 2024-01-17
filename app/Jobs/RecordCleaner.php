<?php

namespace App\Jobs;

use App\Models\ManualOverride;
use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class RecordCleaner implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $messagesCutoff = Carbon::now()->subHours(6);
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
    }
}
