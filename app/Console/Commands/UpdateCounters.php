<?php

namespace App\Console\Commands;

use App\Models\Planner;
use App\Services\JfkFlightData;
use Exception;
use Illuminate\Console\Command;

class UpdateCounters extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-counters';

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
        try {
            $flightDataApi = new JfkFlightData();

            for ($i = 1; $i <= 3; $i++) {

                $this->info(date_create('now')->format('Y-m-d\TH:i:s\Z') . ' - GetMessage');
                $array = $flightDataApi->SOAPCall('GetMessage');

                if (array_key_exists('message', $array)) {

                    if ($array['message'] === 'Down' || $array['message'] === 'Canceled') {
                        // Try to Subcribe again.
                        $this->info(date_create('now')->format('Y-m-d\TH:i:s\Z') . ' - Subscription DOWN - Trying to Subscribe again');
                        $flightDataApi->SOAPCall('Subscription');
                        Planner::truncate();
                        sleep(5);
                        $this->info(date_create('now')->format('Y-m-d\TH:i:s\Z') . ' - GetMessage');
                        $array = $flightDataApi->SOAPCall('GetMessage');
                        if ($array['message'] === 'Accepted') {
                            $this->info(date_create('now')->format('Y-m-d\TH:i:s\Z') . ' - Subscription Accepted');
                            sleep(1);
                        }
                    } elseif ($array['message'] === 'NoData') {
                        //Keep going subsctrion still UP
                        $this->info(date_create('now')->format('Y-m-d\TH:i:s\Z') . ' - No data in the queue');
                        $newdata = false;
                        sleep(10);
                    } else {
                        //Keep going subsctrion still UP
                        $this->info(date_create('now')->format('Y-m-d\TH:i:s\Z') . ' - Subscription UP');
                    }
                } else {
                    $this->info(date_create('now')->format('Y-m-d\TH:i:s\Z') . ' - Store Data');
                    $flightDataApi->StoreSOAPdata($array);
                }

                // Try get messages until ther is no more data available.
                $newdata = true;
                while ($newdata) {
                    $this->info(date_create('now')->format('Y-m-d\TH:i:s\Z') . ' - GetMessage - data Loop');
                    $array = $flightDataApi->SOAPCall('GetMessage');

                    //print_r($array);
                    if (array_key_exists('message', $array)) {
                        if ($array['message'] === 'NoData') {
                            $this->info(date_create('now')->format('Y-m-d\TH:i:s\Z') . ' - No data in the queue');
                            $newdata = false;
                            sleep(10);
                        }
                    } else {
                        $flightDataApi->StoreSOAPdata($array);
                    }
                }
            }
            $this->info('Done');
        } catch (Exception $e) {
            $this->info($e->getMessage() . ' in file ' . $e->getFile() . ' on line number: ' . $e->getLine());
        }
    }
}
