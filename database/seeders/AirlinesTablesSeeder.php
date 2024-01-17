<?php

namespace Database\Seeders;

use Database\Seeders\SeedData\AirlinesBasicSeedData;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AirlinesTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $records = AirlinesBasicSeedData::getAirlinesBasicSeedData();

        foreach ($records as $record) {

            DB::table('airlines')->insert([
                'iata' => $record['iata'],
                'icao' => $record['icao'],
                'name' => $record['name'],
                'status' => $record['status'],
            ]);
        }
    }
}
