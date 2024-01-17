<?php

namespace App\Models;

use App\Traits\CacheQueryBuilder;
use App\Traits\HasAuditTrail;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Log;

class ManualOverride extends Model
{
    use HasAuditTrail;
    use HasFactory;
    //use CacheQueryBuilder;

    protected $table = 'manual_overrides';

    protected $fillable = [
        'checkindesk',
        'flight_identity',
        'checkin_plan_close_date_time',
        'checkin_plan_open_date_time',
        'flight_origin_date',
        'checkin_close_date_time',
        'checkin_open_date_time',
        'class_code',
        'overridden_by',
        'deletion',
        'updated_at',
    ];

    protected $appends = [
        'overridden_by_name',
        'permission_name',
        'label',
        'actor_email',
    ];

    public function getCreatedAtAttribute($date)
    {
        return Carbon::parse($date)->format('Y-m-d H:i:s');
    }

    public function getUpdatedAtAttribute($date)
    {
        return Carbon::parse($date)->format('Y-m-d H:i:s');
    }

    public function getActorEmailAttribute(): string
    {
        try {
            if (config('cache.model_caching')) {
                return Cache::store('request')->remember('override_actor_email_' . $this->overridden_by, 60 * 60 * 24, fn () => User::where('id', $this->overridden_by)->first()->email ?? '');
            }

            return User::where('id', $this->overridden_by)->first()->email ?? '';
        } catch (Exception $e) {
            return '';
        }
    }

    public function getLabelAttribute()
    {
        if (!$this->airlines || !$this->class_code) {
            return '';
        }

        try {
            if (config('cache.model_caching')) {
                return Cache::store('request')->remember('label_' . $this->airlines->id . '_' . $this->class_code, 60 * 60 * 24, fn () => $this->airlines->airlinesLabelsLids()->where('class_code', $this->class_code)->value('label'));
            }

            return $this->airlines->airlinesLabelsLids()->where('class_code', $this->class_code)->value('label');
        } catch (Exception $e) {
            return '';
        }
    }

    public function getAirlineLabels()
    {
        try {
            if (config('cache.model_caching')) {
                return Cache::store('request')->remember('airline_labels_' . $this->airlines->id, 60 * 60 * 24, fn () => $this->airlines->airlinesLabelsLids);
            }

            return $this->airlines->airlinesLabelsLids;
        } catch (Exception $e) {
            return [];
        }
    }

    public function getAirlinesAttribute()
    {
        if (config('cache.model_caching')) {
            return Cache::store('request')->remember('airline_basic_' . $this->iata, 60 * 60 * 24, fn () => AirlinesBasic::where('iata', $this->iata)->first());
        }

        return AirlinesBasic::where('iata', $this->iata)->first();
    }

    public function getIataAttribute()
    {
        return mb_substr($this->flight_identity, 0, 2);
    }

    public function getPermissionNameAttribute()
    {
        return 'overrides';
    }

    public function getOverriddenByNameAttribute()
    {
        if (!$this->overridden_by) {
            return '';
        }

        if (config('cache.model_caching')) {
            return Cache::store('request')->rememberForever('user_name_abbrev_' . $this->overridden_by, function () {
                $user = User::where('id', $this->overridden_by)->first();

                return $user ? $user->getNameAbbrev() : '';
            });
        }

        $user = User::where('id', $this->overridden_by)->first();

        return $user ? $user->getNameAbbrev() : '';
    }

    public function planners()
    {
        return $this->hasOne(Planner::class, 'manual_override_id', 'id');
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
