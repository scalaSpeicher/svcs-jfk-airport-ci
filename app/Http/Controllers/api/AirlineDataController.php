<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EndcapWayfinder;
use App\Http\Requests\MessageData;
use App\Http\Requests\RowLids;
use App\Models\AirlinesBasic;
use App\Models\Counter;
use App\Models\Destination;
use App\Models\Message;
use App\Models\Planner;
use App\Models\Template;
use App\Services\JfkFlightData;
use DateTime;
use DateTimeZone;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AirlineDataController extends Controller
{
    public function rowLids(RowLids $request)
    {
        try {
            $response['success'] = true;
            $params = $request->query();

            $order = in_array($params['row'], [2, 4, 6, 8]) ? 'desc' : 'asc';
            $search = $params['position'] === 'full' ? [['row', '=', $params['row']]] : [['row', '=', $params['row']], ['position', '=', $params['position']]];

            $counters = DB::table('counters')
                ->where($search)
                ->orderByRaw("CAST(counter_location as SIGNED INTEGER) {$order}")
                ->get();
            if (!count($counters)) {
                return response()->json($response);
            }
            foreach ($counters as $key => $counter) {

                if ($counter->counter_location < 10) {
                    $tmpcheckindesk = $counter->row . '-0' . $counter->counter_location;
                } else {
                    $tmpcheckindesk = $counter->row . '-' . $counter->counter_location;
                }

                $currentdatetime = date_create('now');
                $currentdatetime->setTimezone(new DateTimeZone('America/New_York'));

                $planner = Planner::where([
                    ['checkindesk', $tmpcheckindesk],
                    ['checkin_plan_open_date_time', '<=', $currentdatetime],
                    ['checkin_plan_close_date_time', '>=',  $currentdatetime],
                    ['checkin_close_date_time',  null],
                ])->first();

                if (!$planner) {
                    $airline = AirlinesBasic::where('iata', 'T4')->first();
                    $airlineBranding = $airline->airlinesBranding;
                    $response['data']['Counters'][] = [
                        'id' => (int) ($counter->counter_location),
                        'label' => '',
                        'status' => 'Closed',
                        'bgcolor' => $airlineBranding->lids_background_color,
                        'bglogo' => [Storage::url('airlines_branding_seed_data/' . $airlineBranding->lids_logo_large)],
                        'width' => $counter->width,
                        'type' => $counter->type,
                        'position' => $counter->position,
                    ];
                } else {

                    $tmpIATA = mb_substr($planner->flight_identity, 0, 2);
                    $airline = AirlinesBasic::where('iata', $tmpIATA)->first();

                    if (!$airline) {
                        $airline = AirlinesBasic::where('iata', 'T4')->first();
                    }

                    // Populating airline branding
                    $airlineBranding = $airline->airlinesBranding;

                    $Airlinelabel = $airline->airlinesLabelsLids()
                        ->where('class_code', $planner->class_code)
                        ->first();

                    $bglogo = [Storage::url('airlines_branding_seed_data/' . $airlineBranding->lids_logo_large)];

                    ### Hardcoded TSA images. TODO
                    if (isset($Airlinelabel->label)) {
                        if ($Airlinelabel->label === 'TSA') {
                            $bglogo = [];
                            array_push($bglogo, Storage::url('TSA/311_TSA_735x360.jpg'), Storage::url('TSA/Checked_Baggage_735x360.jpg'));
                            ### Hardcoded DRG images. TODO
                            if ($tmpIATA === "AI") {
                                array_push($bglogo, Storage::url('DRG/AI.png'));
                            } elseif ($tmpIATA === "EK") {
                                array_push($bglogo, Storage::url('DRG/EK.png'));
                            }
                        }
                    }

                    $response['data']['Counters'][$key] = [
                        'id' => (int) ($counter->counter_location),
                        'label' => ($Airlinelabel) ? $Airlinelabel->label : '',
                        'status' => ($Airlinelabel) ? 'Open' : 'Closed',
                        'bgcolor' => $airlineBranding->lids_background_color,
                        'bglogo' => $bglogo,
                        'width' => $counter->width,
                        'type' => $counter->type,
                        'position' => $counter->position,
                    ];
                }
            }

            return response()->json($response);
        } catch (Exception $e) {
            return response()->json($this->exceptionResponse($e));
        }
    }

    public function rowSsbd(RowLids $request) // We can reuse RowLids request object
    {
        try {
            $response['success'] = true;
            $params = $request->query();
            $response['data']['Airline'] = '';

            if ($params['position'] === 'entry') {
                $counter_location = '1';
            } else {
                $counter_location = '15';
            }

            $counters = DB::table('counters')
                ->where([
                    ['row', '=', $params['row']],
                    ['counter_location', '=', $counter_location],
                ])
                ->limit(1)
                ->get();
            if (!count($counters)) {
                return response()->json($response);
            }

            foreach ($counters as $counter) {

                if ($counter->counter_location < 10) {
                    $tmpcheckindesk = $counter->row . '-0' . $counter->counter_location;
                } else {
                    $tmpcheckindesk = $counter->row . '-' . $counter->counter_location;
                }

                $currentdatetime = date_create('now');
                $currentdatetime->setTimezone(new DateTimeZone('America/New_York'));

                $planner = Planner::where([
                    ['checkindesk', $tmpcheckindesk],
                    ['checkin_plan_open_date_time', '<=', $currentdatetime],
                    ['checkin_plan_close_date_time', '>=',  $currentdatetime],
                    ['checkin_close_date_time',  null],
                ])->first();

                if ($planner) {

                    $tmpIATA = mb_substr($planner->flight_identity, 0, 2);
                    $airline = AirlinesBasic::where('iata', $tmpIATA)->first();

                    if (!$airline) {
                        $airline = AirlinesBasic::where('iata', 'T4')->first();
                    }

                    // Populating airline branding
                    // $airlineBranding = AirlinesBranding::where('airline_id', $airline->id)->first();
                    $airlineBranding = $airline->airlinesBranding;

                    $response['data']['AirlineLogos'] = $this->formatLogosData($airlineBranding);
                    $response['data']['BackgroundColor'] = $airlineBranding->lids_background_color;

                    $response['data']['Airline'] = $tmpIATA;
                    break;
                }
            }

            return response()->json($response);
        } catch (Exception $e) {
            return response()->json($this->exceptionResponse($e));
        }
    }

    public function endcapWayfinder(EndcapWayfinder $request)
    {

        try {

            $response['success'] = true;
            $response['Counters'] = [];
            $params = $request->query();
            foreach ($params['row'] as $row) {
                if (in_array($params['row'], [2, 4, 6, 8])) {
                    $order = 'desc';
                } else {
                    $order = 'asc';
                }

                $counters = Counter::where('row', $row)
                    ->orderByRaw("CAST(counters.counter_location as SIGNED INTEGER) {$order}")
                    ->get([
                        'row',
                        'counter_location',
                        'position',
                    ]);

                foreach ($counters as $key => $counter) {

                    if ($counter->counter_location < 10) {
                        $tmpcheckindesk = $counter->row . '-0' . $counter->counter_location;
                    } else {
                        $tmpcheckindesk = $counter->row . '-' . $counter->counter_location;
                    }

                    $currentdatetime = date_create('now');
                    $currentdatetime->setTimezone(new DateTimeZone('America/New_York'));

                    $planner = Planner::where([
                        ['checkindesk', $tmpcheckindesk],
                        ['checkin_plan_open_date_time', '<=', $currentdatetime],
                        ['checkin_plan_close_date_time', '>=',  $currentdatetime],
                        ['checkin_close_date_time',  null],
                    ])->first();

                    if (!$planner) {
                        $airline = AirlinesBasic::where('iata', 'T4')->first();
                        $response['Counters'][] = [
                            'row' => $counter->row,
                            'counter_location' => (int) ($counter->counter_location),
                            'airline' => 'JFK',
                            'wayfinding_arrow_color' => null,
                            'logo_small_color' => null,
                            'logo_large_color' => null,
                            'position' => $counter->position,
                        ];
                    } else {

                        $tmpIATA = mb_substr($planner->flight_identity, 0, 2);
                        $airline = AirlinesBasic::where('iata', $tmpIATA)->first();

                        if (!$airline) {
                            $airline = AirlinesBasic::where('iata', 'T4')->first();
                        }

                        // Populating airline branding
                        // $airlineBranding = AirlinesBranding::where('airline_id', $airline->id)
                        //     ->first();
                        $airlineBranding = $airline->airlinesBranding;

                        $logo_large_color = Storage::url('airlines_branding_seed_data/' . $airlineBranding->logo_large_color);
                        $logo_small_color = Storage::url('airlines_branding_seed_data/' . $airlineBranding->logo_small_color);
                        $wayfinding_arrow_color = Storage::url('airlines_branding_seed_data/' . $airlineBranding->wayfinding_arrow_color);

                        $response['Counters'][] = [
                            'row' => $counter->row,
                            'counter_location' => (int) ($counter->counter_location),
                            'airline' => $tmpIATA,
                            'wayfinding_arrow_color' => $wayfinding_arrow_color,
                            'logo_small_color' => $logo_small_color,
                            'logo_large_color' => $logo_large_color,
                            'position' => $counter->position,
                        ];
                    }
                }
                /*
                // Replacing any empty airline values with 'JFK' placeholder
                for($i = 0; $i < count($counters); $i++) {
                    if(is_null($counters[$i]['airline'])) {
                        $counters[$i]['airline'] = 'JFK';
                    }
                    if($counters[$i]['wayfinding_arrow_color']) {
                        $counters[$i]['wayfinding_arrow_color'] = Storage::url('airlines_branding_seed_data/' . $counters[$i]['wayfinding_arrow_color']);
                    }
                    if($counters[$i]['logo_small_color']) {
                        $counters[$i]['logo_small_color'] = Storage::url('airlines_branding_seed_data/' . $counters[$i]['logo_small_color']);
                    }
                    if($counters[$i]['logo_large_color']) {
                        $counters[$i]['logo_large_color'] = Storage::url('airlines_branding_seed_data/' . $counters[$i]['logo_large_color']);
                    }

                    $response['Counters'][] = $counters[$i];
                }*/
            }

            return response()->json($response);
        } catch (Exception $e) {
            return response()->json($this->exceptionResponse($e));
        }
    }

    public function rowFids(RowLids $request) // We can reuse RowLids request object
    {
        try {
            $response['success'] = true;
            $params = $request->query();

            // Formatting empty response
            $response['data']['primaryColor'] = '';
            $response['data']['secondaryColor'] = '';
            $response['data']['flights'] = [];

            $flightDataApi = new JfkFlightData($params);
            $flightsData = $flightDataApi->getFlightDataForRowFids();

            $i = 0;
            $firstFoundAirlineIata = '';
            foreach ($flightsData as $flightData) {

                // Check if airline is active or not
                $airline = AirlinesBasic::where('iata', $flightData['publicCarrierCode'])
                    ->first();

                if (!$airline) {
                    $airline = AirlinesBasic::where('iata', 'T4')->first();
                }

                if ($airline->status !== 'Active') {
                    continue;
                }

                // We want to make sure all flights data belong to same airline, if not then its a problem
                if (!$firstFoundAirlineIata) {
                    $firstFoundAirlineIata = $flightData['publicCarrierCode'];
                }

                // Throw exception
                //if($flightData['publicCarrierCode'] != $firstFoundAirlineIata) {
                //    $message = 'Row-Fids -- All flights found does not belong to same airline. ';
                //    $message .= 'First matching airline was iata: ' . $firstFoundAirlineIata;
                //    $message .= '. At later stage a different airline iata ' . $flightData['publicCarrierCode'] . ' is seen.';
                //    throw new Exception($message);
                //}

                // $airlineBranding = AirlinesBranding::where('airline_id', $airline->id)
                //     ->first();
                $airlineBranding = $airline->airlinesBranding;

                if (!$airlineBranding) {
                    throw new Exception('Airline branding not found in database for airline ID ' . $airline->id);
                }

                $response['data']['primaryColor'] = $airlineBranding->lids_background_color;
                $response['data']['secondaryColor'] = $airlineBranding->secondary_color;
                $response['data']['theme'] = $airlineBranding->mode;

                $response['data']['flights'][$i] = [
                    'destination' => $this->getDestinationNameByIata($flightData['destIATACode']),
                    'airlineLogos' => $this->formatLogosData($airlineBranding),
                ];

                $response['data']['flights'][$i]['flightId'] = $this->formatFlightId($flightData['publicFlightIdentity']);

                $scheduledTime = $this->formatTimeAndDate($flightData['scheduledTime']);
                $response['data']['flights'][$i]['time'] = $scheduledTime['time'];
                $response['data']['flights'][$i]['date'] = $scheduledTime['date'];

                $response['data']['flights'][$i]['status'] = $this->getFlightStatusByCode($flightData);
                $response['data']['flights'][$i]['gate'] = $flightData['gate'];
                $response['data']['flights'][$i]['codeShares'] = $flightData['codeShares'];

                $i++;
            }
            // Sorting by destination in ascending order
            if (count($response['data']['flights'])) {
                $columns = array_column($response['data']['flights'], 'destination');
                array_multisort($columns, SORT_ASC, $response['data']['flights']);
            }

            return response()->json($response);
        } catch (Exception $e) {
            return response()->json($this->exceptionResponse($e));
        }
    }

    public function endcapFids(Request $request)
    {

        try {
            $response['success'] = true;

            // Formatting empty response
            $response['data']['flights'] = [];

            $flightDataApi = new JfkFlightData();
            $flightsData = $flightDataApi->getFlightDataForEndcapFids();

            $i = 0;
            foreach ($flightsData as $flightData) {

                // Check if airline is active or not
                $airline = AirlinesBasic::where('iata', $flightData['publicCarrierCode'])
                    ->first();

                if (!$airline) {
                    // continue;
                    // to do - remove continue;
                    $airline = AirlinesBasic::where('iata', 'T4');
                    #throw new Exception('Airline not found in database for carrier ' . $flightData['publicCarrierCode']);
                }
                if ($airline->status !== 'Active') {
                    continue;
                }

                // $airlineBranding = AirlinesBranding::where('airline_id', $airline->id)
                //     ->first();
                $airlineBranding = $airline->airlinesBranding;

                if (!$airlineBranding) {
                    $airlineBranding = AirlinesBasic::where('iata', 'T4')->airlinesBranding;
                    #throw new Exception('Airline branding not found in database for carrier ' . $flightData['publicCarrierCode']);
                }

                $response['data']['flights'][$i] = [
                    'destination' => $this->getDestinationNameByIata($flightData['destIATACode']),
                    'airlineLogos' => $this->formatLogosData($airlineBranding),
                ];

                $response['data']['flights'][$i]['flightId'] = $this->formatFlightId($flightData['publicFlightIdentity']);

                // to do - remove times
                // $response['data']['flights'][$i]['checkinOpenTime'] = $flightData['checkinOpenTime'];
                // $response['data']['flights'][$i]['checkinCloseTime'] = $flightData['checkinCloseTime'];

                $scheduledTime = $this->formatTimeAndDate($flightData['scheduledTime']);
                $response['data']['flights'][$i]['time'] = $scheduledTime['time'];
                $response['data']['flights'][$i]['date'] = $scheduledTime['date'];

                $response['data']['flights'][$i]['status'] = $this->getFlightStatusByCode($flightData);
                $response['data']['flights'][$i]['row'] = $flightData['checkinRow'];
                $response['data']['flights'][$i]['codeShares'] = $flightData['codeShares'];

                $i++;
            }

            // Sorting by destination in ascending order
            if (count($response['data']['flights'])) {
                $columns = array_column($response['data']['flights'], 'destination');
                array_multisort($columns, SORT_ASC, $response['data']['flights']);
            }

            return response()->json($response);
        } catch (Exception $e) {
            return response()->json($this->exceptionResponse($e));
        }
    }

    public function waitTimes(Request $request)
    {

        try {

            $flightDataApi = new JfkFlightData();
            $flightsData = $flightDataApi->callWaitTimesApi();

            return response()->json($flightsData);
        } catch (Exception $e) {
            return response()->json($this->exceptionResponse($e));
        }
    }

    public function currentCounters()
    {

        try {

            $flightDataApi = new JfkFlightData();
            $flightsData = $flightDataApi->callSOAPCounters();

            return response()->json($flightsData);
        } catch (Exception $e) {
            return response()->json($this->exceptionResponse($e));
        }
    }

    public function findInUseRows()
    {

        try {
            $response['success'] = true;

            // Formatting empty response
            $response['data']['flights'] = [];

            $flightDataApi = new JfkFlightData();
            $flightsData = $flightDataApi->getInUseRows();

            $i = 0;
            foreach ($flightsData as $flightData) {

                // Check if airline is active or not
                $airline = AirlinesBasic::where('iata', $flightData['publicCarrierCode'])
                    ->first();

                if (!$airline) {
                    continue;
                    // to do - remove continue;
                    //throw new Exception('Airline not found in database for carrier ' . $flightData['publicCarrierCode']);
                }
                if ($airline->status !== 'Active') {
                    continue;
                }

                // $airlineBranding = AirlinesBranding::where('airline_id', $airline->id)
                //     ->first();
                $airlineBranding = $airline->airlinesBranding;

                if (!$airlineBranding) {
                    throw new Exception('Airline branding not found in database for carrier ' . $flightData['publicCarrierCode']);
                }

                //$response['data']['flights'][$i] = [
                //    'destination' => $this->getDestinationNameByIata($flightData['destIATACode']),
                //    'airlineLogos' => $this->formatLogosData($airlineBranding),
                //];

                $response['data']['flights'][$i]['Airline'] = $flightData['publicCarrierCode'];
                //$response['data']['flights'][$i]['flightId'] = $this->formatFlightId($flightData['publicFlightIdentity']);

                //$scheduledTime = $this->formatTimeAndDate($flightData['scheduledTime']);
                //$response['data']['flights'][$i]['time'] = $scheduledTime['time'];
                //$response['data']['flights'][$i]['date'] = $scheduledTime['date'];

                //$response['data']['flights'][$i]['status'] = $this->getFlightStatusByCode($flightData);
                $response['data']['flights'][$i]['row'] = $flightData['checkinRow'];
                $response['data']['flights'][$i]['DeskRange'] = $flightData['checkinDeskRange'];

                $i++;
            }

            // Sorting by destination in ascending order
            if (count($response['data']['flights'])) {
                $columns = array_column($response['data']['flights'], 'row');
                array_multisort($columns, SORT_ASC, $response['data']['flights']);
            }

            return $response;
        } catch (Exception $e) {
            return response()->json($this->exceptionResponse($e));
        }
    }

    /**
     * Returns destination name by destination IATA
     */
    public function getDestinationNameByIata($destIATACode)
    {
        // Get destination name
        $destination = Destination::where('iata', $destIATACode)
            ->first();
        if (!$destination) {
            return $destIATACode;
        }

        return $destination->city;
    }

    /**
     * Formats flight ID in format XY 1234 (letters, space, numbers)
     */
    public function formatFlightId($flightId)
    {
        return mb_substr($flightId, 0, 2) . ' ' . mb_substr($flightId, 2, 8);
    }

    /**
     * Formats time and date
     */
    public function formatTimeAndDate($scheduledTime)
    {

        $scheduledDateTime = DateTime::createFromFormat('Y-m-d\TH:i:s\Z', $scheduledTime);

        return [
            'time' => $scheduledDateTime->format('h:ia'),
            'date' => $scheduledDateTime->format('m/d/Y'),
        ];
    }

    /**
     * Returns flight status description
     */
    public function getFlightStatusByCode($flightData)
    {

        $flightStatusCode = $flightData['flightStatusCode'];
        if ($flightStatusCode === 'CX') {
            return 'Cancelled';
        }
        if ($flightStatusCode === 'ES') {

            $estimatedDateTime = DateTime::createFromFormat('Y-m-d\TH:i:s\Z', $flightData['estimatedOffBlockTime']);
            $estimatedDateTime->setTimezone(new DateTimeZone('America/New_York'));

            return 'Now ' . $estimatedDateTime->format('h:ia');
        }

        return 'On Time';
    }

    public function formatLogosData($airlineBranding)
    {

        return [
            'ssbd_logo' => Storage::url(
                'airlines_branding_seed_data/' . $airlineBranding->ssbd_logo
            ),
            'logo_small_white' => Storage::url(
                'airlines_branding_seed_data/' . $airlineBranding->logo_small_white
            ),
            'logo_small_color' => Storage::url(
                'airlines_branding_seed_data/' . $airlineBranding->logo_small_color
            ),
            'logo_large_white' => Storage::url(
                'airlines_branding_seed_data/' . $airlineBranding->logo_large_white
            ),
            'logo_large_color' => Storage::url(
                'airlines_branding_seed_data/' . $airlineBranding->logo_large_color
            ),
            'lids_logo_large' => Storage::url(
                'airlines_branding_seed_data/' . $airlineBranding->lids_logo_large
            ),
            'endcap_fids_logo_small_color' => Storage::url(
                'airlines_branding_seed_data/' . $airlineBranding->endcap_fids_logo_small_color
            ),
            'wayfinding_arrow_color' => Storage::url(
                'airlines_branding_seed_data/' . $airlineBranding->wayfinding_arrow_color
            ),
            'brand_accent_image' => Storage::url(
                'airlines_branding_seed_data/' . $airlineBranding->brand_accent_image
            ),
        ];
    }

    public function exceptionResponse($exception)
    {
        return [
            'success' => false,
            'message' => $exception->getMessage() . ' in file ' . $exception->getFile() . ' on line number: ' . $exception->getLine(),
            'data' => [],
        ];
    }

    public function messageDefault(MessageData $request)
    {
        try {
            $params = $request->query();
            $template = Template::where('id', $params['template_id'])->first();
            $playerMessage = $template->generateDefaultMessage();

            return response()->json($playerMessage);
        } catch (Exception $e) {
            return response()->json($this->exceptionResponse($e));
        }
    }

    public function messageData(MessageData $request)
    {
        try {
            $params = $request->query();
            $message = Message::where('id', $params['message_id'])->first();
            $response['templateUrl'] = $message->v_template_url;
            $response['data'] = json_decode($message->json_data);

            return response()->json($response);
        } catch (Exception $e) {
            return response()->json($this->exceptionResponse($e));
        }
    }
}
