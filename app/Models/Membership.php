<?php

namespace App\Models;

use App\Traits\CacheQueryBuilder;
use App\Traits\HasAuditTrail;
use Exception;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Facades\Cache;
use Log;

class Membership extends Pivot
{
    use CacheQueryBuilder;
    use HasAuditTrail;

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * The table associated with the pivot model.
     *
     * @var string
     */
    protected $table = 'team_user';

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'name',
        'email',
        'profile_photo_url',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'role',
        'team_id',
        'user_id',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function getNameAttribute()
    {
        try {
            if (config('cache.model_caching')) {
                return Cache::store('request')->remember('user_name_abbrev_' . $this->user_id, 60 * 60 * 24, fn () => User::findOrFail($this->user_id)->getUsername());
            }

            return User::findOrFail($this->user_id)->getUsername();

        } catch (Exception $e) {
            Log::error($e->getMessage());
        }
    }

    public function getEmailAttribute()
    {
        try {
            if (config('cache.model_caching')) {
                return Cache::store('request')->remember('user_email_' . $this->user_id, 60 * 60 * 24, fn () => User::findOrFail($this->user_id)->email);
            }

            return User::findOrFail($this->user_id)->email;

        } catch (Exception $e) {
            Log::error($e->getMessage());
        }
    }

    public function getProfilePhotoUrlAttribute()
    {
        try {
            if (config('cache.model_caching')) {
                return Cache::store('request')->remember('profile_photo_url_' . $this->user_id, 60 * 60 * 24, fn () => User::findOrFail($this->user_id)->profile_photo_url);
            }

            return User::findOrFail($this->user_id)->profile_photo_url;

        } catch (Exception $e) {
            Log::error($e->getMessage());
        }
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
