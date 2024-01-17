<?php

namespace Database\Seeders;

use Database\Seeders\SeedData\CountersSeedData;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $records = CountersSeedData::getCountersSeedData();

        foreach ($records as $record) {

            DB::table('counters')->insert([
                'counter_location' => $record['counter_location'],
                'row' => $record['row'],
                'position' => $record['position'],
            ]);
        }
    }
}
