<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiRequestLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'personal_access_token_id',
        'auth_method',
        'request_data',
    ];

    protected $casts = [
        'request_data' => 'array',
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function getRequestDataAttribute($value): ?array
    {
        return ($value) ? json_decode($value, true) : null;
    }

    public function setRequestDataAttribute($value): void
    {
        $data = [];

        foreach ($value as $key => $value) {
            $data[$key] = $value;
        }

        $this->attributes['request_data'] = json_encode($data);
    }
}
