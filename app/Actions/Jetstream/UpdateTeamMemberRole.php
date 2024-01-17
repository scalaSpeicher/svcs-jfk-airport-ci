<?php

namespace App\Actions\Jetstream;

use App\Events\TeamMemberUpdated;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Laravel\Jetstream\Jetstream;
use Laravel\Jetstream\Rules\Role;

class UpdateTeamMemberRole
{
    /**
     * Update the role for the given team member.
     *
     * @param  mixed  $user
     * @param  mixed  $team
     * @param  int  $teamMemberId
     */
    public function update($user, $team, $teamMemberId, string $role): void
    {
        Gate::forUser($user)->authorize('updateTeamMember', $team);

        Validator::make([
            'role' => $role,
        ], [
            'role' => ['required', 'string', new Role()],
        ])->validate();

        $team->users()->updateExistingPivot($teamMemberId, [
            'role' => $role,
        ]);

        $teamMember = Jetstream::findUserByIdOrFail($teamMemberId);
        $teamMember['role'] = $role;

        TeamMemberUpdated::dispatch($team->fresh(), $teamMember);
    }
}
