<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Log;

class AuditTrail extends Model
{
    use HasFactory;

    protected $table = 'audit_trail';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'reference_table',
        'reference_id',
        'actor',
        'data',
        'audit_changes',
    ];

    protected $casts = [
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $appends = [
        'permission_name',
        'actor_email',
        'user_email',
    ];

    public function getPermissionNameAttribute(): string
    {
        return 'audits';
    }

    public function getActorEmailAttribute(): string
    {
        $actor_id = explode('(', $this->actor)[1] ?? null;
        $actor_id = $actor_id ? mb_substr($actor_id, 0, -1) : null;
        $user = $actor_id ? User::find($actor_id) : null;

        return $user->email ?? '';
    }

    public function getUserEmailAttribute(): string
    {
        if ($this->reference_table === 'users') {
            return User::find($this->reference_id)->email;
        }

        return '';
    }

    public function setAuditChangesAttribute($value): void
    {
        $this->attributes['audit_changes'] = json_encode($value);
    }

    public function getAuditChangesAttribute($value)
    {
        return json_decode($value);
    }

    protected static function boot(): void
    {
        parent::boot();

        if (config('cache.model_caching')) {
            self::created(function (): void {
                self::flushCache();
            });

            self::updated(function (): void {
                self::flushCache();
            });

            self::deleted(function (): void {
                self::flushCache();
            });
        }
    }

    private static function flushCache(): void
    {
        try {
            Cache::store('request')->flush();
        } catch (Exception $e) {
            Log::error($e->getMessage());
        }
    }
}
