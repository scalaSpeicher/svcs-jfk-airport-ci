<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class ModelUpdatingException extends Exception
{
    public function __construct(private int $id, private string $model)
    {
        $this->model = Str::afterLast($model, '\\');
    }

    public function status(): int
    {
        return Response::HTTP_BAD_REQUEST;
    }

    public function help(): string
    {
        return trans('exception.model_not_updated.help');
    }

    public function error(): string
    {
        return trans('exception.model_not_updated.error', [
            'id' => $this->id,
            'model' => $this->model,
        ]);
    }
}
