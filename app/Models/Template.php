<?php

namespace App\Models;

use App\Traits\HasAuditTrail;
use DB;
use Exception;
use App\Traits\CacheQueryBuilder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Log;
use stdClass;

class Template extends Model
{
    use CacheQueryBuilder;
    use HasAuditTrail;
    use HasFactory;

    protected $table = 'templates';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'category',
        'description',
        'thumbnail',
        'full_url',
        'manifest_verified',
        'manifest_errors',
        'updated_at',
    ];

    protected $casts = [
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $hidden = [
        'pivot',
        'created_at',
        'updated_at',
    ];

    protected $appends = [
        'permission_name',
        'template_store',
        'thumbnail_photo_url',
        'manifest',
    ];

    public function getManifestAttribute()
    {
        try {
            if ($this->full_url !== null && $this->manifest_verified) {
                $file_path = rtrim($this->full_url, '/') . '/manifest.json';
                $handle = file_get_contents($file_path);

                return json_decode($handle);
            }
        } catch (Exception $e) {
            Log::error('getManifestAttribute... ' . $e->getMessage());
        }
    }

    public function generatePlayerMessageAndComponents($messageData = null): stdClass
    {
        try {
            $playerMessage = (is_string($messageData)) ? $this->generateDefaultMessage($messageData) : $this->generateMessageData($messageData);
            $playerMessageComponents = $this->generatePlayerMessageComponents();
            $playerMessageAndComponents = new stdClass();
            $playerMessageAndComponents->message = $playerMessage;
            $playerMessageAndComponents->components = $playerMessageComponents;

            return $playerMessageAndComponents;
        } catch (Exception $e) {
            Log::error('generatePlayerMessageAndComponents - ' . $e->getMessage());
        }

    }

    public function generateMessageData(Message $message, $translate = false): stdClass
    {
        try {
            $playerMessage = app()->make('stdClass');
            $playerMessage->name = $message->name;
            $playerMessage->id = $message->id;
            $messageData = $message->json_data;
            $manifest = $this->manifest->configTypes;

            foreach ($manifest as $messageField) {
                dump($messageField);
                if (mb_strtolower($messageField->type) === 'font') {
                    $playerMessage->{$messageField->name} = (object) [
                        'color' => $messageData[$messageField->name]['color'],
                        'family' => $messageData[$messageField->name]['family'],
                        'size' => $messageData[$messageField->name]['size'],
                        'weight' => $messageData[$messageField->name]['weight'],
                    ];
                } else {
                    $playerMessage->{$messageField->name} = $messageData[$messageField->name];
                }
            }

            return $playerMessage;
        } catch (Exception $e) {
            Log::error('generateMessageData - ' . $e->getMessage());
        }
    }

    public function generateDefaultMessage($messageName = null): stdClass
    {
        try {
            $playerMessage = app()->make('stdClass');
            $playerMessage->name = ($messageName) ? $messageName : 'New Message';
            $manifest = $this->manifest->configTypes;

            foreach ($manifest as $messageField) {
                if (mb_strtolower($messageField->type) === 'font') {
                    foreach ($messageField->family->options as $option) {
                        if (property_exists($option, 'default')) {
                            $familyDefault = $option->value;
                        }
                    }
                    $playerMessage->{$messageField->name} = (object) [
                        'color' => $messageField->color->default,
                        'family' => $familyDefault,
                        'size' => $messageField->size->default,
                        'weight' => $messageField->weight->default,
                    ];
                } else {
                    if (property_exists($messageField, 'options')) {
                        foreach ($messageField->options as $option) {
                            $option->default = property_exists($option, 'default');
                            if ($option->default) {
                                $playerMessage->{$messageField->name} = $option->value;
                            }
                        }
                    } else {
                        $playerMessage->{$messageField->name} = (property_exists($messageField, 'default')) ? $messageField->default : '';
                    }
                }
            }
            $message = new Message();
            $message->json_data = $playerMessage;
            $message->save();
            $message->templates()->sync($this->id);
            $playerMessage->id = $message->id;

            return $playerMessage;
        } catch (Exception $e) {
            Log::error('generateDefaultMessage - ' . $e->getMessage());
        }
    }

    public function generatePlayerMessageComponents()
    {
        try {
            $playerMessageComponents = [];
            $playerMessageFatComps = [];
            $airlinesOptions = DB::table('airlines')
                ->join('airlines_branding', 'airlines_branding.airlines_basic_id', '=', 'airlines.id')
                ->select('airlines.id', 'airlines.name', 'airlines_branding.lids_logo_large', 'airlines_branding.lids_background_color')
                ->get();

            foreach ($this->manifest->configTypes as $messageField) {
                $internal = property_exists($messageField, 'internal') ? $messageField->internal : false;

                $messageComponent = [
                    'type' => property_exists($messageField, 'type') ? $messageField->type : 'text',
                    'label' => property_exists($messageField, 'label') ? $messageField->label : '',
                    'name' => property_exists($messageField, 'name') ? $messageField->name : '',
                    'required' => property_exists($messageField, 'required') ? $messageField->required : false,
                    'readonly' => property_exists($messageField, 'readonly') ? $messageField->readonly : false,
                    'internal' => $internal,
                ];

                if (property_exists($messageField, 'default')) {
                    $messageComponent['default'] = $messageField->default;
                }

                if ($internal) {
                    continue;
                }

                switch (mb_strtolower($messageField->type)) {
                    case 'font':
                        $fontComponent = [];
                        if ((property_exists($messageField->color, 'internal') && !$messageField->color->internal)
                            || !property_exists($messageField->color, 'internal')) {
                            $fontComponent['color'] = [
                                'type' => 'picker',
                                'default' => $messageField->color->default,
                            ];
                        }
                        if ((property_exists($messageField->family, 'internal') && !$messageField->family->internal)
                            || !property_exists($messageField->family, 'internal')) {
                            foreach ($messageField->family->options as $option) {
                                $option->default = property_exists($option, 'default');
                            }
                            $fontComponent['family'] = [
                                'type' => 'select',
                                'options' => $messageField->family->options,
                            ];
                        }
                        if ((property_exists($messageField->size, 'internal') && !$messageField->size->internal)
                            || !property_exists($messageField->size, 'internal')) {
                            $fontComponent['size'] = [
                                'type' => 'number',
                                'min' => $messageField->size->min,
                                'max' => $messageField->size->max,
                                'default' => $messageField->size->default,
                            ];
                        }
                        if ((property_exists($messageField->weight, 'internal') && !$messageField->weight->internal)
                            || !property_exists($messageField->weight, 'internal')) {
                            $fontComponent['weight'] = [
                                'type' => 'number',
                                'min' => $messageField->weight->min,
                                'max' => $messageField->weight->max,
                                'default' => $messageField->weight->default,
                            ];
                        }
                        $messageComponent = array_merge($messageComponent, $fontComponent);
                        break;
                    case 'number':
                        $messageComponent = array_merge($messageComponent, [
                            'min' => (property_exists($messageField, 'min')) ? $messageField->min : 1,
                            'max' => (property_exists($messageField, 'max')) ? $messageField->max : 100,
                        ]);
                        break;
                    case 'textarea':
                        $messageComponent = array_merge($messageComponent, [
                            'rows' => (property_exists($messageField, 'rows')) ? $messageField->rows : 3,
                        ]);
                        break;
                    case 'select':
                    case 'toggle':
                        if (property_exists($messageField, 'options')) {
                            foreach ($messageField->options as $option) {
                                $option->default = property_exists($option, 'default');
                            }
                            $messageComponent = array_merge($messageComponent, [
                                'options' => $messageField->options,
                            ]);
                        } else {
                            $messageComponent = array_merge($messageComponent, [
                                'options' => [],
                            ]);
                        }
                        break;
                    case 'airlines-select':
                        $messageComponent = array_merge($messageComponent, [
                            'options' => $airlinesOptions,
                        ]);
                        break;
                    default:
                        break;
                }

                if (mb_strtolower($messageField->type) === 'font'
                    || mb_strtolower($messageField->type) === 'textarea'
                    || mb_strtolower($messageField->type) === 'toggle'
                    || mb_strtolower($messageField->type) === 'number'
                    || mb_strtolower($messageField->type) === 'airlines-select'
                ) {
                    $playerMessageFatComps[$messageField->name] = $messageComponent;
                } else {
                    $playerMessageComponents[$messageField->name] = $messageComponent;
                }
            }
            $playerMessageComponents = array_merge($playerMessageComponents, $playerMessageFatComps);

            return $playerMessageComponents;
        } catch (Exception $e) {
            Log::error('generatePlayerMessageComponents - ' . $e->getMessage());
        }
    }

    public function getTemplateStoreAttribute()
    {
        return Storage::url($this->templateStoragePath());
    }

    public function getPermissionNameAttribute(): string
    {
        return 'templates';
    }

    public function messages(): BelongsToMany
    {
        return $this->belongsToMany(
            Message::class,
            'message_template',
            'template_id',
            'message_id'
        );
    }

    public function fields(): BelongsToMany
    {
        return $this->belongsToMany(
            TemplateField::class,
            'template_template_field',
            'template_id',
            'template_field_id'
        );
    }

    public function createManifest(): void
    {
        $manifest = [
            'name' => $this->name,
            'category' => $this->category,
            'description' => $this->description,
            'full_url' => $this->full_url,
            'thumbnail' => $this->thumbnail,
            'configTypes' => $this->fields->makeHidden(['id', 'pivot', 'created_at', 'updated_at']),
        ];

        Storage::put($this->templateStorageDisk() . '/' . $this->templateStoragePath() .
            '/manifest.json', json_encode($manifest));
    }

    /**
     * Get the URL to the template's manifest.
     */
    public function manifestUrl(): Attribute
    {
        return Attribute::get(function () {
            return $this->full_url && $this->manifest_verified
                ? Storage::disk($this->templateStorageDisk())->url($this->full_url)
                : null;
        });
    }

    /**
     * Delete the template's manifest.
     */
    public function deleteManifest(): void
    {
        if ($this->full_url === null) {
            return;
        }

        Storage::disk($this->templateStorageDisk())->delete($this->full_url);

        $this->forceFill([
            'full_url' => null,
        ])->save();
    }

    /**
     * Update the template's manifest.
     *
     * @param  string  $storagePath
     */
    public function updateManifest(UploadedFile $manifest): void
    {
        try {
            tap($this->full_url, function ($previous) use ($manifest): void {
                $this->forceFill([
                    'full_url' => $manifest->storeAs(
                        $this->templateStoragePath() . '/manifest.json',
                        ['disk' => $this->templateStorageDisk()]
                    ),
                ])->save();

                if ($previous) {
                    Storage::disk($this->templateStorageDisk())->delete($previous);
                }
            });
        } catch (Exception $e) {
            $message = 'There was a problem... ' . $e->getMessage();

            Log::error($message);
        }
    }

    /**
     * Update the template's thumbnail photo.
     *
     * @param  string  $storagePath
     */
    public function updateThumbnailPhoto(UploadedFile $photo): void
    {
        try {
            tap($this->thumbnail, function ($previous) use ($photo): void {
                $this->forceFill([
                    'thumbnail' => $photo->storePublicly(
                        $this->templateStoragePath(),
                        ['disk' => $this->templateStorageDisk()]
                    ),
                ])->save();

                if ($previous) {
                    Storage::disk($this->templateStorageDisk())->delete($previous);
                }
            });
        } catch (Exception $e) {
            $message = 'There was a problem... ' . $e->getMessage();

            Log::error($message);
        }
    }

    public function downloadThumbnailPhoto(string $thumbnailPath): void
    {
        try {
            $path = Storage::putFileAs($this->templateStorageDisk(), new File($thumbnailPath), 'thumbnail.jpg');
            $this->forceFill([
                'thumbnail' => $this->templateStorageDisk() . '/thumbnail.jpg',
            ])->save();
        } catch (Exception $e) {
            $message = 'There was a problem... ' . $e->getMessage();

            Log::error($message);
        }
    }

    /**
     * Delete the template's thumbnail photo.
     */
    public function deleteThumbnailPhoto(): void
    {
        if ($this->thumbnail === null) {
            return;
        }

        Storage::disk($this->templateStorageDisk())->delete($this->thumbnail);

        $this->forceFill([
            'thumbnail' => null,
        ])->save();
    }

    /**
     * Delete the template's store.
     */
    public function deleteTemplateStore(): void
    {
        Storage::disk($this->templateStorageDisk())->deleteDirectory($this->templateStoragePath());
    }

    /**
     * Get the URL to the template's thumbnail photo.
     */
    public function getThumbnailPhotoUrlAttribute()
    {
        if (mb_substr((string) $this->thumbnail, 0, 4) == 'http') {
            return $this->thumbnail;
        }

        return $this->thumbnail
            ? Storage::disk($this->templateStorageDisk())->url($this->thumbnail)
            : null;
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

    /**
     * Get the disk that templates should be stored on.
     *
     * @return string
     */
    protected function templateStorageDisk()
    {
        return config('filesystem.template_store', 'public');
    }

    /**
     * Get the path that templates should be stored on.
     *
     * @return string
     */
    protected function templateStoragePath()
    {
        return 'template-store/template-' . $this->id;
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
