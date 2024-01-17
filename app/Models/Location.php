<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Log;

class Location extends Model
{
    use HasFactory;

    protected $table = 'locations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
    ];

    protected $casts = [
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $appends = [
        'permission_name',
    ];

    public function getPermissionNameAttribute(): string
    {
        return 'locations';
    }

    public function models()
    {
        return $this->belongsToMany(
            Model::class,
            'model_has_locations',
            'model_id',
            'location_id'
        );
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
