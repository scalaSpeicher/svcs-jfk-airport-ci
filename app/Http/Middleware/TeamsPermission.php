<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Laravel\Jetstream\Contracts\AddsTeamMembers;
use Laravel\Jetstream\Jetstream;
use Spatie\Permission\PermissionRegistrar;

class TeamsPermission
{
    public function handle(Request $request, Closure $next)
    {
        if (!empty($user = auth()->user())) {
            if (empty($user->current_team_id)) {
                $user->current_team_id = 1;
                $user->save();
                $team = Jetstream::newTeamModel()->findOrFail(1);
                try {
                    Jetstream::findUserByIdOrFail($user->id)->authorize('addTeamMember', $team);
                    app(AddsTeamMembers::class)->add(
                        $user,
                        $team,
                        $user->email ?: '',
                        'reader'
                    );
                    $team->users()->syncWithoutDetaching([$user->id => ['role' => 'reader']]);
                } catch (Exception $e) {
                    //dump($e);
                }
            }
            app(PermissionRegistrar::class)->setPermissionsTeamId($user->current_team_id);
        }

        return $next($request);
    }
}
