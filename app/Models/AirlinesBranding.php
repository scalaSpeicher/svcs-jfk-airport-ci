<?php

namespace App\Models;

use App\Traits\CacheQueryBuilder;
use App\Traits\HasAuditTrail;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Log;

class AirlinesBranding extends Model
{
    use CacheQueryBuilder;
    use HasAuditTrail;
    use HasFactory;

    public $timestamps = false;

    protected $table = 'airlines_branding';

    protected $fillable = [
        'mode',
        'primary_color',
        'secondary_color',
        'tertiary_color',
        'font',
        'font_color_primary',
        'font_color_secondary',
        'fids_color',
        'ssbd_logo',
        'logo_small_color',
        'logo_large_color',
        'lids_logo_large',
        'endcap_fids_logo_small',
        'wayfinding_arrow_color',
    ];

    protected $appends = [
        'permission_name',
        'brand_store',
    ];

    public function airlines(): HasOne
    {
        return $this->hasOne(AirlinesBasic::class);
    }

    public function getPermissionNameAttribute()
    {
        return 'airlines_branding';
    }

    public function getBrandStoreAttribute()
    {
        return Storage::url('airlines_branding_seed_data/');
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
