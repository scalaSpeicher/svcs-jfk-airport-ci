<?php

namespace Database\Seeders;

use Database\Seeders\SeedData\DestinationsSeedData;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DestinationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $records = DestinationsSeedData::getDestinationsSeedData();

        foreach ($records as $record) {

            DB::table('destinations')->insert([
                'iata' => $record['iata'],
                'icao' => $record['icao'],
                'city' => $record['city'],
                'airport_name' => $record['airport_name'],
                'country' => $record['country'],
                'country_code' => $record['country_code'],
                'latitude' => $record['latitude'],
                'longitude' => $record['longitude'],
                'status' => $record['status'],
            ]);
        }
    }
}
