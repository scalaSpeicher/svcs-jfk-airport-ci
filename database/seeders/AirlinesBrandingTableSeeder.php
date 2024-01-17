<?php

namespace Database\Seeders;

use Database\Seeders\SeedData\AirlineBrandingSeedData;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AirlinesBrandingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $records = AirlineBrandingSeedData::getAirlineBrandingSeedData();

        foreach ($records as $record) {

            DB::table('airlines_branding')->insert([
                'airline_id' => $record['airline_id'],
                'mode' => $record['mode'],
                'primary_color' => $record['primary_color'],
                'secondary_color' => $record['secondary_color'],
                'tertiary_color' => $record['tertiary_color'],
                'font' => $record['font'],
                'font_color_primary' => $record['font_color_primary'],
                'font_color_secondary' => $record['font_color_secondary'],
                'ssbd_logo' => $record['ssbd_logo'],
                'fids_color' => $record['fids_color'],
                'logo_small_white' => $record['logo_small_white'],
                'logo_small_color' => $record['logo_small_color'],
                'logo_large_white' => $record['logo_large_white'],
                'logo_large_color' => $record['logo_large_color'],
                'lids_logo_large' => $record['lids_logo_large'],
                'endcap_fids_logo_small_color' => $record['endcap_fids_logo_small_color'],
                'wayfinding_arrow_color' => $record['wayfinding_arrow_color'],
                'brand_accent_image' => $record['brand_accent_image'],
                'lids_background_color' => $record['lids_background_color'],
                'lids_status_bar_color' => $record['lids_status_bar_color'],
            ]);
        }
    }
}
