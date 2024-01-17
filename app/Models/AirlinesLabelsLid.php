<?php

namespace App\Models;

use App\Traits\CacheQueryBuilder;
use App\Traits\HasAuditTrail;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Cache;
use Log;

class AirlinesLabelsLid extends Model
{
    use CacheQueryBuilder;
    use HasAuditTrail;
    use HasFactory;

    public $timestamps = false;

    protected $table = 'airlines_labels_lids';

    protected $fillable = [
        'label',
        'class_code',
        'created_at',
        'created_by',
    ];

    protected $appends = [
        'permission_name',
    ];

    public function getPermissionNameAttribute()
    {
        return 'airlines_labels_lids';
    }

    public function airlines(): BelongsToMany
    {
        return $this->belongsToMany(
            AirlinesBasic::class,
            'airlines_basic_airline_labels_lid',
            'airline_labels_lids_id',
            'airlines_basic_id'
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
