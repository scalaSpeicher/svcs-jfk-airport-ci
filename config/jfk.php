<?php

return [

    /*
    |--------------------------------------------------------------------------
    | JFK API values from .env
    |--------------------------------------------------------------------------
    */

    'JFK_FLIGHT_API_SUBSCRIPTION_KEY' => env('JFK_FLIGHT_API_SUBSCRIPTION_KEY', false),
    'JFK_FLIGHT_API_BASE_URL' => env('JFK_FLIGHT_API_BASE_URL', false),
    'JFK_FLIGHT_API_DIRECTION' => env('JFK_FLIGHT_API_DIRECTION', false),
    'JFK_FLIGHT_API_AIRPORT' => env('JFK_FLIGHT_API_AIRPORT', false),
    'JFK_FLIGHT_API_START_TIME' => env('JFK_FLIGHT_API_START_TIME', false),
    'JFK_FLIGHT_API_END_TIME' => env('JFK_FLIGHT_API_END_TIME', false),
    'JFK_FLIGHT_APIWAITTIMES_URL' => env('JFK_FLIGHT_APIWAITTIMES_URL', false),
    'JFK_FLIGHT_APIWAITTIMES_SUBSCRIPTION_KEY' => env('JFK_FLIGHT_APIWAITTIMES_SUBSCRIPTION_KEY', false),
    'JFK_FLIGHT_SOAP_URL' => env('JFK_FLIGHT_SOAP_URL', false),
    'JFK_FLIGHT_SOAP_USER' => env('JFK_FLIGHT_SOAP_USER', false),
    'JFK_FLIGHT_SOAP_PASSWORD' => env('JFK_FLIGHT_SOAP_PASSWORD', false),
];
