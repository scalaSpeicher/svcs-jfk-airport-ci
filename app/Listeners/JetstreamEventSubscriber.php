<?php

namespace App\Listeners;

use App\Services\HelperMethods;
use Illuminate\Events\Dispatcher;
use Laravel\Jetstream\Events\TeamCreated;
use Laravel\Jetstream\Events\TeamDeleted;
use Laravel\Jetstream\Events\TeamEvent;
use Laravel\Jetstream\Events\TeamMemberAdded;
use Laravel\Jetstream\Events\TeamMemberRemoved;
use Laravel\Jetstream\Events\TeamMemberUpdated;
//use App\Events\TeamMemberUpdated;
use Laravel\Jetstream\Events\TeamUpdated;

class JetstreamEventSubscriber
{
    private $helperMethodsObj;

    public function __construct(HelperMethods $helperMethodsObj)
    {
        $this->helperMethodsObj = $helperMethodsObj;
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
    }

    /**
     * Handle the event.
     */
    public function handleTeam(TeamEvent $event): void
    {
    }

    /**
     * Handle the event.
     */
    public function handleTeamMemberAdded(TeamMemberAdded $event): void
    {
        $changes = [
            'model' => 'Team Member Added',
            'team' => $event->team->name,
            'user' => '(' . $event->user->email . ' | ID: ' . $event->user->id . ')',
        ];
        $this->helperMethodsObj->createAudit($event->team, $changes);
    }

    /**
     * Handle the event.
     */
    public function handleTeamMemberRemoved(TeamMemberRemoved $event): void
    {
        $changes = [
            'model' => 'Team Member Removed',
            'team' => $event->team->name,
            'user' => '(' . $event->user->email . ' | ID: ' . $event->user->id . ')',
        ];
        $this->helperMethodsObj->createAudit($event->team, $changes);
    }

    /**
     * Handle the event.
     */
    public function handleTeamMemberUpdated(TeamMemberUpdated $event): void
    {
        $changes = [
            'model' => 'Team Member Updated',
            'team' => $event->team->name,
            'user' => '(' . $event->user->email . ' | ID: ' . $event->user->id . ')',
            'role' => $event->user->role,
        ];
        $this->helperMethodsObj->createAudit($event->team, $changes);
    }

    /**
     * Handle the event.
     */
    public function handleTeamUpdated(TeamUpdated $event): void
    {
        $changes = [
            'model' => 'Team Name Updated',
            'team' => $event->team->name,
        ];
        $this->helperMethodsObj->createAudit($event->team, $changes);
    }

    /**
     * Handle the event.
     */
    public function handleTeamDeleted(TeamDeleted $event): void
    {
        $changes = [
            'model' => 'Team Deleted',
            'team' => $event->team->name,
        ];
        $this->helperMethodsObj->createAudit($event->team, $changes);
    }

    /**
     * Handle the event.
     */
    public function handleTeamCreated(TeamCreated $event): void
    {
        $changes = [
            'model' => 'Team Created',
            'team' => $event->team->name,
        ];
        $this->helperMethodsObj->createAudit($event->team, $changes);
    }

    /**
     * Register the listeners for the subscriber.
     *
     * @return array<string, string>
     */
    public function subscribe(Dispatcher $events): array
    {
        return [
            TeamMemberAdded::class => 'handleTeamMemberAdded',
            TeamMemberRemoved::class => 'handleTeamMemberRemoved',
            TeamMemberUpdated::class => 'handleTeamMemberUpdated',
            TeamUpdated::class => 'handleTeamUpdated',
            TeamDeleted::class => 'handleTeamDeleted',
            TeamCreated::class => 'handleTeamCreated',
        ];
    }
}
