<?php

namespace App\Traits;

use App\Exceptions\ModelUpdatingException;
use Illuminate\Database\Eloquent\Model;

trait UpdateOrThrow
{
    /**
     * Find a model by id, fill the model with an array of attributes, update
     * the model into the database, otherwise it throws an exception.
     *
     *
     * @throws ModelUpdatingException
     */
    public static function updateOrThrow(int $id, array $attributes): Model
    {
        $model = self::model()->findOrFail($id)->fill($attributes);

        if ($model->update() === false) {
            throw new ModelUpdatingException($id, get_class());
        }

        return $model;
    }

    public static function bulkUpdateOrThrow($updates, $planner = false): bool
    {
        $key = array_keys($updates);
        $size = count($key);
        for ($i = 0; $i < $size; $i++) {
            $update = json_decode(json_encode($updates[$key[$i]]), true);
            if ($planner) {
                if (isset($update['converted_open']) || isset($update['converted_close'])) {
                    //$update['converted_open'] = json_decode(json_encode($update['converted_open']), true);
                    //$update['converted_close'] = json_decode(json_encode($update['converted_close']), true);
                    $update = self::translateConverted($update);
                }

                unset($update['manual_override_id']);
            }
            $result = self::updateOrThrow($update['id'], $update);
            if (!$result instanceof Model) {
                return false;
            }
        }

        return true;
    }

    public static function translateConverted($planner)
    {
        if (isset($planner['converted_open'])) {
            $planner[$planner['converted_open']['field']] = $planner['converted_open']['value'];
            unset($planner['converted_open']);
        }
        if (isset($planner['converted_close'])) {
            $planner[$planner['converted_close']['field']] = $planner['converted_close']['value'];
            unset($planner['converted_close']);
        }

        return $planner;
    }

    /**
     * Instantiate the model implementing this trait by the model's class name.
     */
    private static function model(): mixed
    {
        return new (get_class());
    }
}
