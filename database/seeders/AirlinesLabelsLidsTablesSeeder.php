<?php

namespace Database\Seeders;

use Database\Seeders\SeedData\AirlinesLabelsLid;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AirlinesLabelsLidsTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $records = AirlinesLabelsLid::getAirlinesLabelsLidSeedData();

        foreach ($records as $record) {

            DB::table('airlines_labels_lids')->insert([
                'airline_id' => $record['airline_id'],
                'label' => $record['label'],
                'class_code' => $record['class_code'],
            ]);
        }
    }
}
