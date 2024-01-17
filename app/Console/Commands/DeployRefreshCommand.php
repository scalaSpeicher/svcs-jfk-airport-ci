<?php

namespace App\Console\Commands;

use App\Actions\Jetstream\UpdateTeamMemberRole;
use App\Models\User;
use DB;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Laravel\Jetstream\Contracts\AddsTeamMembers;
use Laravel\Jetstream\Contracts\CreatesTeams;
use Laravel\Jetstream\Contracts\UpdatesTeamNames;
use Laravel\Jetstream\Jetstream;
use Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

/**
 * Console command for installing teams, roles, and permissions.
 *
 * This command clears the cache, truncates related tables, creates permissions for models,
 * creates roles and assigns permissions to them, and updates related routes.
 *
 * Usage: php artisan permission:seed-permissions
 */
class DeployRefreshCommand extends Command implements PromptsForMissingInput
{
    use WithoutModelEvents;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deploy:refresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'all the extra bits to refresh the database post deployment';

    protected $creator;

    protected $addsTeamMembers;

    protected $updater;

    protected $command;

    protected $updateTeamMemberRole;

    /**
     * Models used for route permission generation
     *
     * @var array
     */
    protected $accessModels = [
        'App\Models\AirlinesBasic',
        'App\Models\AirlinesBranding',
        'App\Models\AirlinesLabelsLid',
        'AirlinesLogos',
        'App\Models\AuditTrail',
        'App\Models\Counter',
        'App\Models\Location',
        'App\Models\Message',
        'App\Models\Planner',
        'App\Models\Destination',
        'App\Models\ManualOverride',
        'App\Models\Role',
        'App\Models\Schedule',
        'App\Models\Team',
        'App\Models\Template',
        'Tokens',
        'App\Models\User',
    ];

    protected $basicPerms = [
        'airlines.index',
        'airlines_branding.update',
        'airlines_labels_lids.update',
        'airlines_logos.update',
        'counters.index',
        'destinations.index',
        'locations.index',
        'messages.index',
        'messages.unlock',
        'messages.cancel',
        'overrides.index',
        'planners.index',
        'schedules.index',
        'templates.index',
        'users.index',
    ];

    public function __construct(
        CreatesTeams $creator,
        UpdatesTeamNames $updater,
        AddsTeamMembers $addsTeamMembers,
        UpdateTeamMemberRole $updateTeamMemberRole,
        User $authUser,
    ) {
        $this->creator = $creator;
        $this->addsTeamMembers = $addsTeamMembers;
        $this->updater = $updater;
        $this->updateTeamMemberRole = $updateTeamMemberRole;
        $authUser = $authUser;
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        $authUser = DB::table('users')
            ->where('email', 'marco.pasqual@scala.com')
            ->orWhere('email', 'matthew.speicher@scala.com')
            ->first();
        if ($authUser === null) {
            DB::table('users')->insert([
                'id' => null,
                'first_name' => 'scala',
                'last_name' => 'admin',
                'email' => 'marco.pasqual@scala.com',
                'email_verified_at' => null,
                'password' => '$2y$10$DEKHdlN5K7sgRvtF85dMTeW0hgiClIH1iQBOQM9DQiHIudtvdv/2u', // p455w0rd
                'p455w0rd' => null,
                'two_factor_secret' => null,
                'two_factor_recovery_codes' => null,
                'remember_token' => null,
                'current_team_id' => 1,
                'profile_photo_path' => null,
                'created_at' => '2023-08-10 14:00:00',
                'updated_at' => '2023-08-10 14:00:00',
            ]);
            $authUser = DB::table('users')->where('email', 'marco.pasqual@scala.com')->first();
        }

        DB::table('roles')->truncate();
        DB::table('model_has_permissions')->truncate();
        DB::table('model_has_roles')->truncate();
        DB::table('role_has_permissions')->truncate();
        DB::table('permissions')->truncate();
        DB::table('teams')->truncate();
        DB::table('team_user')->truncate();
        DB::table('teams')->insert(
            ['name' => 'Scala', 'user_id' => $authUser->id, 'personal_team' => 0]
        );
        DB::table('teams')->insert(
            ['name' => 'JFKIAT', 'user_id' => $authUser->id, 'personal_team' => 0]
        );
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        foreach ($this->accessModels as $className) {
            try {
                if ($className !== 'AirlinesLogos' && $className !== 'Tokens') {
                    $model = new $className();
                }
                switch ($className) {
                    case 'Tokens':
                        Permission::create(['name' => 'tokens.create']);
                        Permission::create(['name' => 'tokens.index']);
                        Permission::create(['name' => 'tokens.edit']);
                        Permission::create(['name' => 'tokens.store']);
                        Permission::create(['name' => 'tokens.update']);
                        Permission::create(['name' => 'tokens.destroy']);
                        break;
                    case 'App\Models\Team':
                        Permission::create(['name' => $model->permission_name . '.show']);
                        break;
                    case 'App\Models\AirlinesBranding':
                        Permission::create(['name' => $model->permission_name . '.create']);
                        Permission::create(['name' => $model->permission_name . '.store']);
                        Permission::create(['name' => $model->permission_name . '.edit']);
                        Permission::create(['name' => $model->permission_name . '.update']);
                        Permission::create(['name' => $model->permission_name . '.destroy']);
                        break;
                    case 'App\Models\AirlinesLabelsLid':
                        Permission::create(['name' => $model->permission_name . '.create']);
                        Permission::create(['name' => $model->permission_name . '.store']);
                        Permission::create(['name' => $model->permission_name . '.edit']);
                        Permission::create(['name' => $model->permission_name . '.update']);
                        Permission::create(['name' => $model->permission_name . '.destroy']);
                        break;
                    case 'AirlinesLogos':
                        Permission::create(['name' => 'airlines_logos.create']);
                        Permission::create(['name' => 'airlines_logos.store']);
                        Permission::create(['name' => 'airlines_logos.edit']);
                        Permission::create(['name' => 'airlines_logos.update']);
                        Permission::create(['name' => 'airlines_logos.destroy']);
                        break;
                    case 'App\Models\AuditTrail':
                        Permission::create(['name' => $model->permission_name . '.index']);
                        break;
                    case 'App\Models\ManualOverride':
                        Permission::create(['name' => $model->permission_name . '.index']);
                        Permission::create(['name' => $model->permission_name . '.restore']);
                        break;
                    case 'App\Models\Planner':
                        Permission::create(['name' => $model->permission_name . '.index']);
                        Permission::create(['name' => $model->permission_name . '.create']);
                        Permission::create(['name' => $model->permission_name . '.store']);
                        Permission::create(['name' => $model->permission_name . '.edit']);
                        Permission::create(['name' => $model->permission_name . '.update']);
                        break;
                    case 'App\Models\Message':
                        Permission::create(['name' => $model->permission_name . '.index']);
                        Permission::create(['name' => $model->permission_name . '.create']);
                        Permission::create(['name' => $model->permission_name . '.store']);
                        Permission::create(['name' => $model->permission_name . '.edit']);
                        Permission::create(['name' => $model->permission_name . '.refresh']);
                        Permission::create(['name' => $model->permission_name . '.duplicate']);
                        Permission::create(['name' => $model->permission_name . '.unlock']);
                        Permission::create(['name' => $model->permission_name . '.update']);
                        Permission::create(['name' => $model->permission_name . '.destroy']);
                        Permission::create(['name' => $model->permission_name . '.cancel']);
                        break;
                    case 'App\Models\Template':
                        Permission::create(['name' => $model->permission_name . '.index']);
                        Permission::create(['name' => $model->permission_name . '.create']);
                        Permission::create(['name' => $model->permission_name . '.store']);
                        Permission::create(['name' => $model->permission_name . '.edit']);
                        Permission::create(['name' => $model->permission_name . '.update']);
                        Permission::create(['name' => $model->permission_name . '.destroy']);
                        break;
                    default:
                        Permission::create(['name' => $model->permission_name . '.index']);
                        Permission::create(['name' => $model->permission_name . '.create']);
                        Permission::create(['name' => $model->permission_name . '.store']);
                        Permission::create(['name' => $model->permission_name . '.edit']);
                        Permission::create(['name' => $model->permission_name . '.update']);
                        Permission::create(['name' => $model->permission_name . '.destroy']);
                        break;
                }
            } catch (Exception $e) {
                Log::error($e->getMessage());
            }
        }
        Role::create(['name' => 'super-admin'])
            ->givePermissionTo(Permission::all());
        Role::create(['name' => 'user'])
            ->givePermissionTo($this->basicPerms);
        Role::create(['name' => '3rd-party-user'])
            ->givePermissionTo($this->basicPerms);

        // Current User Check
        foreach (User::all() as $user) {
            $team_id = 2;
            $teamRole = 'editor';
            if (str_contains($user->email, '@scala.com')) {
                $team_id = 1;
                $teamRole = 'admin';
            }
            $user->current_team_id = $team_id;
            $user->save();
            $team = Jetstream::newTeamModel()->findOrFail($team_id);

            if ($user->email == $authUser->email) {
                $teamRole = 'owner';
            }
            $team->users()->syncWithoutDetaching([$user['id'] => ['role' => $teamRole]]);
            $team->save();
            if ($team_id === 1) {
                $team = Jetstream::newTeamModel()->findOrFail(2);
                $team->users()->syncWithoutDetaching([$user['id'] => ['role' => $teamRole]]);
                $team->save();
            }
            $currentUserRole = $user->roles()->get()->toArray();
            if (count($currentUserRole) === 0) {
                if (str_contains($user->email, '@scala.com')) {
                    $role = [1];
                    $pivotData = array_fill(0, 1, ['team_id' => 1]);
                    $syncData = array_combine($role, $pivotData);
                    $user->roles()->syncWithoutDetaching($syncData);
                } else {
                    $role = [2];
                    $pivotData = array_fill(0, 1, ['team_id' => 1]);
                    $syncData = array_combine($role, $pivotData);
                    $user->roles()->syncWithoutDetaching($syncData);
                }
                $user->save();
            }
        }
    }
}
