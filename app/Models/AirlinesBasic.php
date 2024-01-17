<?php

namespace App\Models;

use App\Traits\CacheQueryBuilder;
use App\Traits\HasAuditTrail;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Log;

class AirlinesBasic extends Model
{
    use CacheQueryBuilder;
    use HasAuditTrail;
    use HasFactory;

    protected $table = 'airlines';

    protected $fillable = [
        'iata',
        'icao',
        'name',
        'status',
    ];

    protected $appends = [
        'permission_name',
        'brand_store',
    ];

    public function getPermissionNameAttribute()
    {
        return 'airlines';
    }

    public function getBrandStoreAttribute()
    {
        return Storage::url('airlines_branding_seed_data/');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function airlinesBranding(): HasOne
    {
        return $this->hasOne(AirlinesBranding::class);
    }

    public function airlinesLabelsLids()
    {
        return $this->belongsToMany(
            AirlinesLabelsLid::class,
            'airlines_basic_airline_labels_lid',
            'airlines_basic_id',
            'airline_labels_lids_id'
        )->withTimestamps();
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
