<?php

namespace App\Models;

use App\Traits\CacheQueryBuilder;
use App\Traits\HasAuditTrail;
use DB;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Log;

class Counter extends Model
{
    use CacheQueryBuilder;
    use HasAuditTrail;
    use HasFactory;

    public $timestamps = false;

    protected $table = 'counters';

    protected $fillable = [
        'counter_location',
        'row',
        'position',
        'width',
        'type',
        'manual_override',
        'updated_at',
        'updated_by',
    ];

    protected $appends = [
        'permission_name',
    ];

    public function getPermissionNameAttribute()
    {
        return 'counters';
    }

    public function getPlanners()
    {
        $airline_iata = ($this->airlinesBasic === null) ? null : $this->airlinesBasic->iata;
        $counter_location = (mb_strlen($this->counter_location) === 1) ? '0' . $this->counter_location : $this->counter_location;
        $checkindesk = $this->row . '-' . $counter_location;
        if ($airline_iata === null) {
            return Planner::where('checkindesk', $checkindesk)->get();
        }

        return Planner::where('checkindesk', $checkindesk)
            ->where(DB::raw('substr(flight_identity, 1, 2)'), '=', $airline_iata)
            ->get();
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
