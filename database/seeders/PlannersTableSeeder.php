<?php

namespace Database\Seeders;

use DB;
use Eloquent;
use Illuminate\Database\Seeder;

class PlannersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Eloquent::unguard();
        $sql = file_get_contents(database_path('seeders/sql/planners.sql'));

        DB::unprepared($sql);
        //\DB::statement($sql);
    }
}
