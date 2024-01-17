<?php

namespace App\Models;

use App\Traits\CacheQueryBuilder;
use App\Traits\HasAuditTrail;
use App\Traits\UpdateOrThrow;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Log;

class Planner extends Model
{
    use CacheQueryBuilder;
    use HasAuditTrail;
    use HasFactory;
    use UpdateOrThrow;

    protected $table = 'planners';

    protected $appends = [
        'label',
        'permission_name',
        'manual_override',
        'converted_open',
        'converted_close',
    ];

    protected $fillable = [
        'checkindesk',
        'flight_identity',
        'checkin_plan_close_date_time',
        'checkin_plan_open_date_time',
        'flight_origin_date',
        'checkin_close_date_time',
        'checkin_open_date_time',
        'class_code',
        'manual_override_id',
        'updated_at',
    ];

    public function manualOverrides()
    {
        return $this->belongsTo(ManualOverride::class, 'manual_override_id', 'id');
    }

    public function getManualOverrideAttribute()
    {
        if ($this->manual_override_id === null) {
            return;
        }

        return ManualOverride::find($this->manual_override_id);
    }

    public function getConvertedCloseAttribute()
    {
        if ($this->checkin_close_date_time === null) {
            return [
                'field' => 'checkin_plan_close_date_time',
                'value' => $this->checkin_plan_close_date_time,
            ];
        }

        return [
            'field' => 'checkin_close_date_time',
            'value' => $this->checkin_close_date_time,
        ];

    }

    public function getConvertedOpenAttribute()
    {
        if ($this->checkin_open_date_time === null) {
            return [
                'field' => 'checkin_plan_open_date_time',
                'value' => $this->checkin_plan_open_date_time,
            ];
        }

        return [
            'field' => 'checkin_open_date_time',
            'value' => $this->checkin_open_date_time,
        ];

    }

    public function createBackup(): void
    {
        $this->makeOverrideRecord(true);
    }

    public function createOverride(): void
    {
        try {
            $override = $this->makeOverrideRecord(false);
            $this->manualOverrides()->associate($override->id);
            $this->save();
        } catch (Exception $e) {
            Log::error($e->getMessage());
        }
    }

    public function makeOverrideRecord($deletion = false): ManualOverride
    {
        if ($this->manual_override_id === null) {
            $override = ManualOverride::create([
                'checkindesk' => $this->checkindesk,
                'flight_identity' => $this->flight_identity,
                'checkin_plan_close_date_time' => $this->checkin_plan_close_date_time,
                'checkin_plan_open_date_time' => $this->checkin_plan_open_date_time,
                'flight_origin_date' => $this->flight_origin_date,
                'checkin_close_date_time' => $this->checkin_close_date_time,
                'checkin_open_date_time' => $this->checkin_open_date_time,
                'class_code' => $this->class_code,
                'overridden_by' => Auth::user()->id,
                'deletion' => $deletion,
            ]);
            $override->save();
        } else {
            $override = ManualOverride::find($this->manual_override_id);
            $override->checkindesk = $this->checkindesk;
            $override->flight_identity = $this->flight_identity;
            $override->checkin_plan_close_date_time = $this->checkin_plan_close_date_time;
            $override->checkin_plan_open_date_time = $this->checkin_plan_open_date_time;
            $override->flight_origin_date = $this->flight_origin_date;
            $override->checkin_close_date_time = $this->checkin_close_date_time;
            $override->checkin_open_date_time = $this->checkin_open_date_time;
            $override->class_code = $this->class_code;
            $override->overridden_by = Auth::user()->id;
            $override->deletion = $deletion;
            $override->save();
        }

        return $override;
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

    public function getCounter()
    {
        if (str_contains($this->checkindesk, '-')) {
            $parsedCheckin = explode('-', $this->checkindesk);

            return Counter::where('row', $parsedCheckin[0])
                ->where('counter_location', $parsedCheckin[1])
                ->get();
        }

    }

    public function scopeBetweenDates($query, array $dates, string $field)
    {
        $start = ($dates[0] instanceof Carbon) ? $dates[0] : Carbon::parse($dates[0]);
        $end = ($dates[1] instanceof Carbon) ? $dates[1] : Carbon::parse($dates[1]);

        return $query->whereBetween($field, [$start, $end]);
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
        return ($this->flight_identity) ? mb_substr($this->flight_identity, 0, 2) : '';
    }

    public function getPermissionNameAttribute()
    {
        return 'planners';
    }

    public function getUpdatedByNameAttribute()
    {
        if (!$this->updated_by) {
            return '';
        }

        if (config('cache.model_caching')) {
            return Cache::store('request')->rememberForever('user_name_abbrev_' . $this->updated_by, function () {
                $user = User::where('id', $this->updated_by)->first();

                return $user ? $user->getNameAbbrev() : '';
            });
        }

        $user = User::where('id', $this->updated_by)->first();

        return $user ? $user->getNameAbbrev() : '';
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
