<?php

namespace App\Http\Controllers;

use App\Actions\Jetstream\UpdateTeamMemberRole;
use App\Models\Team;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
//use Laravel\Jetstream\Actions\UpdateTeamMemberRole;
use Illuminate\Support\Facades\Auth;
use Laravel\Jetstream\Contracts\AddsTeamMembers;
use Laravel\Jetstream\Contracts\InvitesTeamMembers;
use Laravel\Jetstream\Contracts\RemovesTeamMembers;
use Laravel\Jetstream\Features;
use Laravel\Jetstream\Jetstream;

class TeamMemberController extends Controller
{
    protected HelperMethods $helperMethodsObj;

    private InvitesTeamMembers $invitesTeamMembers;

    private AddsTeamMembers $addsTeamMembers;

    private UpdateTeamMemberRole $updateTeamMemberRole;

    public function __construct(
        InvitesTeamMembers $invitesTeamMembers,
        HelperMethods $helperMethods,
        AddsTeamMembers $addsTeamMembers,
        UpdateTeamMemberRole $updateTeamMemberRole
    ) {
        $this->invitesTeamMembers = $invitesTeamMembers;
        $this->helperMethodsObj = $helperMethods;
        $this->addsTeamMembers = $addsTeamMembers;
        $this->updateTeamMemberRole = $updateTeamMemberRole;
    }

    /**
     * Add a new team member to a team.
     *
     * @param  int  $teamId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, $teamId)
    {
        try {
            $team = $this->findTeam($teamId);

            if (Features::sendsTeamInvitations()) {
                $this->inviteTeamMember($request, $team);
            } else {
                $this->addTeamMember($request, $team);
            }

            return back(303);
        } catch (Exception $e) {
            $message = 'There was a problem storing the team. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Update the given team member's role.
     *
     * @param  int  $teamId
     * @param  int  $userId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $teamId, $userId)
    {
        try {
            $team = $this->findTeam($teamId);
            //$user = Jetstream::findUserByIdOrFail($userId);
            $this->updateTeamMemberRole($request, $team, $userId);

            return back(303);
        } catch (Exception $e) {
            $message = 'There was a problem updating the team. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Remove the given user from the given team.
     *
     * @param  int  $teamId
     * @param  int  $userId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, $teamId, $userId)
    {
        $team = $this->findTeam($teamId);
        $user = Jetstream::findUserByIdOrFail($userId);

        app(RemovesTeamMembers::class)->remove($request->user(), $team, $user);

        if ($request->user()->id === $user->id) {
            return redirect(config('fortify.home'));
        }

        return back(303);
    }

    private function findTeam($teamId)
    {
        return Jetstream::newTeamModel()->findOrFail($teamId);
    }

    private function inviteTeamMember(Request $request, $team): void
    {
        $this->invitesTeamMembers->invite(
            $request,
            $request->user(),
            $team,
            $request->email ?: '',
            $request->role
        );
    }

    private function addTeamMember(Request $request, $team): void
    {
        $this->addsTeamMembers->add(
            $request,
            $request->user(),
            $team,
            $request->email ?: '',
            $request->role
        );
    }

    private function updateTeamMemberRole(Request $request, $team, $userId): void
    {
        $this->updateTeamMemberRole->update(
            Auth::user(),
            $team,
            $userId,
            $request->role
        );
        $teamInstance = Team::with('memberships')->findOrFail($team->id);
        $teamInstance->users()->syncWithoutDetaching([$userId => ['role' => $request->role]]);
    }
}
