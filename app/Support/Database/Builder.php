<?php

namespace App\Support\Database;

use Cache;
use Illuminate\Database\Query\Builder as QueryBuilder;

class Builder extends QueryBuilder
{
    /**
     * Run the query as a "select" statement against the connection.
     *
     * @return array
     */
    protected function runSelect()
    {
        $return = Cache::store('request')->remember($this->getCacheKey(), 60 * 60 * 24, fn () => parent::runSelect());

        return $return;
    }

    /**
     * Returns a Unique String that can identify this Query.
     *
     * @return array
     */
    protected function getCacheKey()
    {
        return json_encode([
            $this->toSql() => $this->getBindings(),
        ]);
    }
}
