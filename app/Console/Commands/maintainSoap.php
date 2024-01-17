<?php

namespace App\Console\Commands;

use App\Services\JfkFlightData;
use Exception;
use Illuminate\Console\Command;

class maintainSoap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:maintain-soap';

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

        try {

            for ($i = 1; $i <= 3; $i++) {

                $logTime = date_create('now');

                $this->info($logTime->format('Y-m-d\TH:i:s\Z') . ' - StatusRequest');

                // First - Check Subscription Status
                $flightDataApi->SOAPCall('StatusRequest');

                $logTime = date_create('now');
                $this->info($logTime->format('Y-m-d\TH:i:s\Z') . ' - Request complete');
                sleep(15);
            }
        } catch (Exception $e) {
            print_r($e->getMessage() . ' in file ' . $e->getFile() . ' on line number: ' . $e->getLine());
            $this->info('message ' . $e->getMessage() . ' in file ' . $e->getFile() . ' on line number: ' . $e->getLine());
        }

        $this->info('SOAP StatusRequest Sent');
    }
}
