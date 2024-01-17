<?php

namespace App\Observers;

use App\Traits\HasAuditTrail;
use Illuminate\Database\Eloquent\Model;

class AuditObserver
{
    use HasAuditTrail;

    /**
     * Handle the User "created" event.
     */
    public function created(Model $model): void
    {
        $this->track($model);
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(Model $model): void
    {
        $this->track($model);
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(Model $model): void
    {
        $this->track($model);
    }

    // /**
    //  * Handle the User "refreshed" event.
    //  */
    // public function refreshed(Model $model): void
    // {
    //     $this->track($model);
    // }

    // /**
    //  * Handle the User "deleted" event.
    //  */
    // public function duplicated(Model $model): void
    // {
    //     $this->track($model);
    // }

    // /**
    //  * Handle the User "restored" event.
    //  */
    // public function restored(Model $model): void
    // {
    //     $this->track($model);
    // }

    // /**
    //  * Handle the User "force deleted" event.
    //  */
    // public function forceDeleted(Model $model): void
    // {
    //     $this->track($model);
    // }
}
