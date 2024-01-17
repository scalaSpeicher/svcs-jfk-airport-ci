<?php

namespace App\Models;

use App\Traits\CacheQueryBuilder;
use App\Traits\HasAuditTrail;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Log;

class Destination extends Model
{
    use CacheQueryBuilder;
    use HasAuditTrail;
    use HasFactory;

    protected $table = 'destinations';

    protected $fillable = [
        'iata',
        'icao',
        'city',
        'airport_name',
        'country',
        'country_code',
        'latitude',
        'longitude',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $appends = [
        'permission_name',
    ];

    public function getPermissionNameAttribute()
    {
        return 'destinations';
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
