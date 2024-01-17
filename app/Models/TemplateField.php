<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Cache;
use Log;

class TemplateField extends Model
{
    use HasFactory;

    protected $table = 'template_fields';

    protected $hidden = ['pivot', 'created_at', 'updated_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'type',
        'label',
        'required',
        'json_data',
        'max',
        'min',
        'lines',
        'default',
        'internal',
        'updated_at',
    ];

    protected $casts = [
        'json_data' => 'array',
        'required' => 'boolean',
        'internal' => 'boolean',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function template(): BelongsToMany
    {
        return $this->belongsToMany(
            Template::class,
            'template_template_field',
            'template_field_id',
            'template_id'
        );
    }

    public function getJsonDataAttribute($value): ?array
    {
        return ($value) ? json_decode($value, true) : null;
    }

    public function setJsonDataAttribute($value): void
    {
        $data = [];

        foreach ($value as $array_item) {
            if ($array_item['key'] !== null) {
                $data[] = $array_item;
            }
        }

        $this->attributes['json_data'] = json_encode($data);
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
