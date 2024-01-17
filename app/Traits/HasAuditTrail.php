<?php

namespace App\Traits;

use App\Models\AuditTrail;
use App\Models\Team;
use Auth;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Schema;

trait HasAuditTrail
{
    protected $originalModel;

    public function createAudit(Model $model, $changes = null, $table = null, $id = null)
    {
        if (!$this->isRunningInConsole() && Auth::user() !== null) {
            try {
                $table ??= $model->getTable();
                $id ??= $model->id;

                $this->originalModel = $model->wasChanged() ? $model->getOriginal() : $model;

                $changes = $this->formatChanges($changes);

                return AuditTrail::create([
                    'reference_table' => $table,
                    'reference_id' => $this->getReferenceId($id),
                    'actor' => $this->getActorString(),
                    'data' => $this->generateDataString($table, $id),
                    'audit_changes' => $changes,
                ]);
            } catch (Exception $e) {
                return $this->handleException($e);
            }
        }
    }

    protected function track(Model $model, ?callable $func = null, $table = null, $id = null)
    {
        if (!$this->isRunningInConsole() && Auth::user() !== null) {
            try {
                $table ??= $model->getTable();
                $id ??= $model->id;
                $func ??= [$this, 'getAuditChanges'];

                $this->getUpdated($model)
                    ->map(fn ($value, $field) => call_user_func_array($func, [$value, $field]))
                    ->each(function ($fields) use ($table, $id): void {
                        AuditTrail::create([
                            'reference_table' => $table,
                            'reference_id' => $this->getReferenceId($id),
                            'actor' => $this->getActorString(),
                            'data' => $this->generateDataString($table, $id),
                            'audit_changes' => $fields['audit_changes'],
                        ]);
                    });
            } catch (Exception $e) {
                return $this->handleException($e);
            }
        }
    }

    protected function getReferenceId($id)
    {
        return $id ?? $this->originalModel['id'] ?? $this->originalModel['airline_id'];
    }

    protected function getAuditChanges($value, $field)
    {
        return [
            'audit_changes' => $this->formatChanges([
                'model' => ucwords(str_replace('_', ' ', $field)),
                'old' => ($this->originalModel[mb_strtolower($field)]) ? mb_strtoupper($this->originalModel[mb_strtolower($field)]) : '',
                'new' => mb_strtoupper($value),
            ]),
        ];
    }

    protected function getUpdated($model)
    {
        $this->originalModel = $model->getOriginal();

        $excludedFields = [
            'created_at', 'updated_at', 'updated_by', 'created_by', 'deleted_at',
            'deleted_by', 'remember_token', 'manual_override_id',
        ];

        return collect($model->getDirty())
            ->reject(fn ($value, $key) => in_array($key, $excludedFields));
    }

    private function isRunningInConsole()
    {
        return app()->runningInConsole();
    }

    private function handleException(Exception $e)
    {
        return redirect()->back()->with('message', 'There was a problem creating the audit. ' . $e->getMessage());
    }

    private function getActorString()
    {
        $user = Auth::user();

        return ($user) ? "{$user->getUsername()}({$user->id})" : 'System';
    }

    private function generateDataString($table, $id)
    {
        $data = ucwords(str_replace('_', ' ', $table)) . " | ID: {$id}";

        if ($table === 'users') {
            $data .= ' | ' . $this->originalModel['first_name'] . $this->originalModel['last_name'];
        } elseif (Schema::hasColumn($table, 'name')) {
            $data .= ' | ' . $this->originalModel['name'];
        }

        return $data;
    }

    private function formatChanges($changes)
    {
        if (!$changes) {
            return '';
        }

        $changeModel = $changes['model'];
        switch ($changeModel) {
            case 'Password':
                return 'Updated <b>Password</b> to <b>********</b>';
            case 'Current Team Id':
                $oldTeam = Team::findOrFail($changes['old'])->name;
                $newTeam = Team::findOrFail($changes['new'])->name;

                return 'Changed active team from <b>' . ucfirst($oldTeam) . '</b> to <b>' . ucfirst($newTeam) . '</b>';
            case 'Created':
                return 'Created: <b>' . ucfirst($changes['created']) . '</b>';
            case 'Deleted':
                return 'Deleted: <b>' . ucfirst($changes['deleted']) . '</b>';
            case 'User Permissions':
                return 'Permissions Granted: <b>' . $changes['given'] . '</b><br />Revoked: <b>' . $changes['taken'] . '</b>';
            case 'Role Update':
                $auditText = (!empty($changes['users_added'])) ? 'Users Added: <b>' . $changes['users_added'] . '</b><br />' : '';
                $auditText .= (!empty($changes['users_removed'])) ? 'Users Removed: <b>' . $changes['users_removed'] . '</b><br />' : '';
                $auditText .= (!empty($changes['perms_added'])) ? 'Perms Added: <b>' . $changes['perms_added'] . '</b><br />' : '';
                $auditText .= (!empty($changes['perms_removed'])) ? 'Perms Removed: <b>' . $changes['perms_removed'] . '</b>' : '';

                return $auditText;
            case 'User Airlines':
                $auditText = (!empty($changes['airlines_added'])) ? 'Airlines Added: <b>' . $changes['airlines_added'] . '</b><br />' : '';
                $auditText .= (!empty($changes['airlines_removed'])) ? 'Airlines Removed: <b>' . $changes['airlines_removed'] . '</b>' : '';

                return $auditText;
            case 'Airlines Labels Lids':
                return '<b>' . $changes['action'] . '</b><br />Class Code: <b>' . $changes['class_code'] . '</b><br />Label: <b>' . $changes['name'] . '</b>';
            case 'Team Member Added':
                return 'New team member <b>' . $changes['user'] . '</b> added to <b>' . ucfirst($changes['team']) . '</b>';
            case 'Team Member Removed':
                return 'Team member <b>' . $changes['user'] . '</b> removed from <b>' . ucfirst($changes['team']) . '</b>';
            case 'Team Member Updated':
                return 'Update role for <b>' . $changes['user'] . '</b> on team <b>' . ucfirst($changes['team']) . '</b> to <b>' .
                    ucfirst(ucfirst($changes['role'])) . '</b>';
            case 'Team Created':
                return 'Team Created: <b>' . ucfirst($changes['team']) . '</b>';
            case 'Team Deleted':
                return 'Team Deleted: <b>' . ucfirst($changes['team']) . '</b>';
            case 'Team Name Updated':
                return 'Team Name Updated to: <b>' . ucfirst($changes['team']) . '</b>';
            case 'Override':
                return '<b>' . $changes['action'] . ' Created for Planner:</b><br />Check-In: ' . $changes['checkindesk'] .
                    ' <b>|</b> Flight ID: ' . $changes['flight_identity'] . ' <b>|</b> Plan Open: ' . $changes['plan_open'] .
                    ' <b>|</b> Plan Close: ' . $changes['plan_close'];
            case 'Restore':
                return '<b>Planner ' . $changes['action'] . ' Removed:</b><br />Check-In: ' . $changes['override_checkindesk'] .
                ' <b>|</b> Flight ID: ' . $changes['override_flight_identity'] . ' <b>|</b> Plan Open: ' . $changes['override_plan_open'] .
                ' <b>|</b> Plan Close: ' . $changes['override_plan_close'] . '<br /><b>Original Planner Restored:</b><br />Check-In: ' . $changes['planner_checkindesk'] .
                ' <b>|</b> Flight ID: ' . $changes['planner_flight_identity'] . ' <b>|</b> Plan Open: ' . $changes['planner_plan_open'] .
                ' <b>|</b> Plan Close: ' . $changes['planner_plan_close'];
            case 'Messages':
                return '<b>' . $changes['action'] . '</b><br />Message: <b>' . $changes['message_name'] . '</b><br />Template: <b>' . $changes['template_name'] . '</b>';
            case 'Templates':
                return '<b>' . $changes['action'] . '</b><br />Template: <b>' . $changes['template_name'] . '</b>';
            case 'Tokens':
                return '<b>' . $changes['action'] . '</b><br />Access Granted: <b>' . $changes['permissions'] . '</b>';
            default:
                return 'Updated <b>' . $changes['model'] . '</b> from <b>' . $changes['old'] . '</b> to <b>' . $changes['new'] . '</b>';
        }
    }
}
