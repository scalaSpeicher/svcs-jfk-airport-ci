<?php

namespace Database\Seeders\SeedData;

class AirlinesLabelsLids
{
    public static function getAirlinesLabelsLidSeedData()
    {
        return [
            0 => [
                'airline_id' => '2',
                'label' => 'First Class',
                'class_code' => 'F',
            ],
            1 => [
                'airline_id' => '2',
                'label' => 'Business',
                'class_code' => 'C',
            ],
            2 => [
                'airline_id' => '2',
                'label' => 'Special Assistance',
                'class_code' => 'K',
            ],
            3 => [
                'airline_id' => '2',
                'label' => 'Other Services',
                'class_code' => 'J',
            ],
            4 => [
                'airline_id' => '19',
                'label' => 'Special Assistance',
                'class_code' => 'C',
            ],
            5 => [
                'airline_id' => '19',
                'label' => 'Check-in Assistance',
                'class_code' => 'P',
            ],
            6 => [
                'airline_id' => '19',
                'label' => 'Premium Check-in',
                'class_code' => 'Y',
            ],
            7 => [
                'airline_id' => '4',
                'label' => 'Star Alliance Gold Member',
                'class_code' => 'N',
            ],
            8 => [
                'airline_id' => '4',
                'label' => 'Special Assistance',
                'class_code' => 'Y',
            ],
            9 => [
                'airline_id' => '4',
                'label' => 'Other Services',
                'class_code' => 'C',
            ],
            10 => [
                'airline_id' => '4',
                'label' => 'Cashier',
                'class_code' => 'F',
            ],
        ];
    }
}
