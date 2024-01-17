<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use App\Services\HelperMethods;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Laravel\Jetstream\Actions\ValidateTeamDeletion;
use Laravel\Jetstream\Contracts\CreatesTeams;
use Laravel\Jetstream\Contracts\DeletesTeams;
use Laravel\Jetstream\Contracts\UpdatesTeamNames;
use Laravel\Jetstream\Http\Controllers\Inertia\TeamController as JetstreamTeamController;
use Laravel\Jetstream\Jetstream;

class TeamController extends JetstreamTeamController
{
    protected $helperMethodsObj;

    protected $creator;

    protected $updater;

    protected $deleter;

    public function __construct(
        HelperMethods $helperMethodsObj,
        CreatesTeams $creator,
        UpdatesTeamNames $updater,
        DeletesTeams $deleter
    ) {
        $this->helperMethodsObj = $helperMethodsObj;
        $this->creator = $creator;
        $this->updater = $updater;
        $this->deleter = $deleter;
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $teamId)
    {
        $team = Team::with(['owner', 'users', 'teamInvitations', 'memberships'])->find($teamId);
        if (!$team) {
            $message = 'Problem accessing team! ID: ' . $teamId;

            return Redirect::back()->with('message', $message);
        }

        $teamMembers = $team->memberships->pluck('user_id')->toArray();
        $usersOptions = User::whereNotIn('id', $teamMembers)->get(['id', 'email', 'first_name', 'last_name'])->toArray();
        $availableRoles = array_values(Jetstream::$roles);
        $availableRolesIndex = 0;
        foreach ($availableRoles as $role) {
            if ($role->key == 'owner') {
                unset($availableRoles[$availableRolesIndex]);
            }
            $availableRolesIndex++;
        }
        $availablePermissions = Jetstream::$permissions;
        $defaultPermissions = Jetstream::$defaultPermissions;
        $canReadTeams = Gate::allows('teams.show');
        $canAddTeams = Gate::allows('teams.create');
        $canEditTeams = Gate::allows('teams.edit');
        $canDeleteTeams = Gate::allows('teams.destroy');
        $isSuperAdmin = Gate::allows('super-admin');
        $permissions = [
            'canAddTeamMembers' => Gate::check('addTeamMember', $team),
            'canDeleteTeam' => Gate::check('delete', $team),
            'canRemoveTeamMembers' => Gate::check('removeTeamMember', $team),
            'canUpdateTeam' => Gate::check('update', $team),
        ];

        return Jetstream::inertia()->render($request, 'Teams/Show', [
            'team' => $team,
            'usersOptions' => $usersOptions,
            'availableRoles' => $availableRoles,
            'availablePermissions' => $availablePermissions,
            'defaultPermissions' => $defaultPermissions,
            'canReadTeams' => $canReadTeams,
            'canAddTeams' => $canAddTeams,
            'canEditTeams' => $canEditTeams,
            'canDeleteTeams' => $canDeleteTeams,
            'isSuperAdmin' => $isSuperAdmin,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $teamId)
    {
        $team = Jetstream::newTeamModel()->find($teamId);
        if (!$team) {
            $message = 'Problem accessing team! ID: ' . $teamId;

            return Redirect::back()->with('message', $message);
        }

        $this->updater->update($request->user(), $team, $request->all());

        $message = 'Team updated successfully.';

        return Redirect::route('teams.show')->with('message', $message);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $newTeam = $this->creator->create($request->user(), $request->all());

        $message = 'Team added successfully.';

        return Redirect::route('teams.show', ['team' => $newTeam])->with('message', $message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $teamId)
    {
        $team = Jetstream::newTeamModel()->find($teamId);
        if (!$team) {
            $message = 'Problem accessing team! ID: ' . $teamId;

            return Redirect::back()->with('message', $message);
        }

        app(ValidateTeamDeletion::class)->validate($request->user(), $team);
        $this->deleter->delete($team);

        $newTeam = Jetstream::newTeamModel()->find(1);
        $request->user()->switchTeam($newTeam);

        $message = 'Team deleted successfully.';

        return redirect()->route('planners.index', ['today_only' => 0, 'search_by' => 'open', 'active_only' => 1, 'sort' => 'checkindesk'])->with('message', $message);
    }
}
