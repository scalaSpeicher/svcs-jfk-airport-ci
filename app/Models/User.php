<?php

namespace App\Models;

use App\Traits\CacheQueryBuilder;
use App\Traits\HasAuditTrail;
use Auth;
use DB;
use Exception;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Jetstream\HasTeams;
use Laravel\Sanctum\HasApiTokens;
use Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use CacheQueryBuilder;
    use HasApiTokens;
    use HasAuditTrail;
    use HasFactory;
    use HasProfilePhoto;
    use HasRoles;
    use HasTeams;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        // 'name',
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
        'permission_name',
    ];

    public function airlines()
    {
        return $this->belongsToMany(
            AirlinesBasic::class,
            'airlines_basic_user',
            'user_id',
            'airlines_basic_id'
        )->withTimestamps();
    }

    public function getPlanners()
    {
        $userAssignedAirlines = $this->airlines()->distinct()->pluck('iata')->toArray();

        return Planner::whereIn(DB::raw('substr(flight_identity, 1, 2)'), $userAssignedAirlines);
    }

    /**
     * Get the URL to the user's profile photo.
     */
    public function profilePhotoUrl(): Attribute
    {
        return Attribute::get(function () {
            return $this->profile_photo_path
                    ? Storage::disk($this->profilePhotoDisk())->url($this->profile_photo_path)
                    : Storage::disk($this->profilePhotoDisk())->url('default.png');
        });
    }

    /**
     * Get the default profile photo URL if no profile photo has been uploaded.
     *
     * @return string
     */
    public function defaultProfilePhotoUrl()
    {
        return Storage::disk($this->profilePhotoDisk())->url('default.png');
    }

    public function getPermissionNameAttribute()
    {
        return 'users';
    }

    public function getAllPermissionsAttribute()
    {
        $permissions = [];
        $user = Auth::user();
        foreach (Permission::all() as $permission) {
            if ($user->can($permission->name)) {
                $permissions[] = $permission->name;
            }
        }

        return $permissions;
    }

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(
            Permission::class,
            'model_has_permissions',
            'model_id',
            'permission_id'
        );
    }

    public function roles()
    {
        return $this->belongsToMany(
            Role::class,
            'model_has_roles',
            'model_id',
            'role_id'
        );
    }

    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(
            Team::class,
            'team_user',
            'user_id',
            'team_id'
        )
            ->withPivot('role')
            ->withTimestamps()
            ->as('membership');
    }

    public function getNameAbbrev()
    {
        return mb_substr($this->first_name, 0, 1) . '. ' . $this->last_name;
    }

    public function getUsername()
    {
        return "{$this->first_name}{$this->last_name}";
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
