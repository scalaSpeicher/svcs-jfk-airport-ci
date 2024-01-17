<?php

namespace App\Listeners;

use App\Events\QueueItemProcessed;

class SendQueueNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(QueueItemProcessed $event): void
    {
        //
    }
}
