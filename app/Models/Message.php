<?php

namespace App\Models;

use App\Traits\HasAuditTrail;
use Exception;
use App\Traits\CacheQueryBuilder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Log;

class Message extends Model
{
    use CacheQueryBuilder;
    use HasAuditTrail;
    use HasFactory;

    protected $table = 'messages';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'json_data',
        'locked_by',
        'preview_data',
        'updated_at',
    ];

    protected $casts = [
        'json_data' => 'array',
        'preview_data' => 'array',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $hidden = [
        'pivot',
        'created_at',
        'updated_at',
    ];

    protected $appends = [
        'permission_name',
        'template_name',
        'locked_by_email',
    ];

    public function getPermissionNameAttribute(): string
    {
        return 'messages';
    }

    public function getLockedByEmailAttribute(): string
    {
        if ($this->locked_by !== 0) {
            $user = User::find($this->locked_by);
            if ($user) {
                return $user->email;
            }
        }

        return '';
    }

    public function getTemplateNameAttribute(): string
    {
        return ($this->templates()->first()) ? $this->templates()->first()->name : '';
    }

    public function templates(): BelongsToMany
    {
        return $this->belongsToMany(
            Template::class,
            'message_template',
            'message_id',
            'template_id',
        );
    }

    public function getJsonDataAttribute($value): ?array
    {
        return ($value) ? json_decode($value, true) : null;
    }

    public function setJsonDataAttribute($value): void
    {
        $data = [];

        foreach ($value as $key => $value) {
            $data[$key] = $value;
        }

        $this->attributes['json_data'] = json_encode($data);
    }

    public function discardPreview(): void
    {
        try {
            if ($this->preview_data !== null) {
                DB::update('update messages set json_data=preview_data where id = ?', [$this->id]);
            }
        } catch (Exception $e) {
            Log::error($e->getMessage());
        }
    }

    public function dupe($name)
    {
        $dupe = $this->replicate();
        $dupe->name = $name;
        $dupe->save();

        return $dupe;
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
