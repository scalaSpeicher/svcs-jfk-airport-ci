<?php

namespace App\Console\Commands;

use App\Services\JfkFlightData;
use Illuminate\Console\Command;

class cancelSoap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:cancel-soap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {

        $flightDataApi = new JfkFlightData();
        $flightsData = $flightDataApi->SOAPCall('CancelSubscription');

        $this->info('SOAP Subscription Cancelled');
    }
}
