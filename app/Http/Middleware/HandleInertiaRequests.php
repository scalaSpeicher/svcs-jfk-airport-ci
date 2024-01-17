<?php

namespace App\Http\Middleware;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $userData = [];
        try {
            if ($request->user()) {
                $user = $request->user();
                $userAirlines = null;
                $role = $user->roles->first();
                if ($role['name'] === '3rd-party-user') {
                    $userAirlines = $user->airlines;
                }
                $team = $user->teams->where('id', $user->current_team_id)->first();
                $userData = [
                    'currentUserRole' => $role,
                    'currentUserTeam' => $team,
                    'canReadUsers' => Gate::allows('users.index'),
                    'canReadAudits' => Gate::allows('audits.index'),
                    'canReadAirlines' => Gate::allows('airlines.index'),
                    'canReadPlanners' => Gate::allows('planners.index'),
                    'canReadOverrides' => Gate::allows('overrides.index'),
                    'canReadCounters' => Gate::allows('counters.index'),
                    'canReadDestinations' => Gate::allows('destinations.index'),
                    'canReadLocations' => Gate::allows('locations.index'),
                    'canReadMessages' => Gate::allows('messages.index'),
                    'canReadSchedules' => Gate::allows('schedules.index'),
                    'canReadTemplates' => Gate::allows('templates.index'),
                    'canReadRoles' => Gate::allows('roles.index'),
                    'canReadTeams' => Gate::allows('teams.show'),
                    'canEditTeams' => Gate::allows('super-admin'),
                    'isSuperAdmin' => Gate::allows('super-admin'),
                    'userAirlines' => $userAirlines,
                    'profilePhotoPath' => Storage::url($user->profile_photo_path),
                ];

            }

            $inertiaReturn = array_merge(parent::share($request), [
                'ziggy' => function () use ($request) {
                    return array_merge((new Ziggy())->toArray(), [
                        'location' => $request->url(),
                    ]);
                },
                'flash' => [
                    'message' => session('message'),
                ],
                'userData' => $userData,
                'csrf_token' => csrf_token(),
            ]);

            return $inertiaReturn;
        } catch (Exception $e) {
            $message = $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }
}
