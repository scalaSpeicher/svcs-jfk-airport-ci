<?php

namespace App\Services;

use App\Models\Planner;
use App\Models\Counter;
use DateTime;
use DateTimeZone;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;


class JfkFlightData
{
    private $row;

    private $position;

    public function __construct($params = null)
    {
        if ($params) {
            $this->row = $params['row'];
            $this->position = $params['position'];
        }
    }

    public function getFlightDataForRowFids()
    {

        $flightsData = $this->callFlightDataApi();
        $fliteredFlightData = [];
        if ($flightsData) {

            foreach ($flightsData as $flightdata) {

                // Filtering for row
                $checkinRow = $flightdata->checkinDesks[0]->checkinRow;
                if ($checkinRow !== $this->row) {
                    continue;
                }
                // Filtering for position
                $checkinDeskRange = $flightdata->checkinDesks[0]->checkinDeskRange;
                // An example desk range: "5-01..5-09", this means starting desk is 01 and ending is 09

                if (((int) (mb_substr($checkinDeskRange, 2, 2)) === 1) && ((int) (mb_substr($checkinDeskRange, 8, 2)) === 18)) {
                    //Full Row - Include flght int he return
                } else {
                    //Check if it is TOP(Entry) or BOTTOM(Security)

                    if (in_array(mb_substr($checkinDeskRange, 0, 1), [2, 4, 6, 7, 8])) {
                        $entryCounter = 1;
                        $securityCounter = 15;
                    } else {
                        $entryCounter = 15;
                        $securityCounter = 1;
                    }

                    if ($this->position !== 'entry') {

                        if ((int) (mb_substr($checkinDeskRange, 2, 2)) === $entryCounter) {
                            //SKIP - FLights set to BOTTOM(Security)
                            continue;
                        }
                    }
                    // security
                    else {
                        if ((int) (mb_substr($checkinDeskRange, 2, 2)) === $securityCounter) {
                            //SKIP - FLights set to TOP(Entry)
                            continue;
                        }
                    }
                }

                $checkinOpenTime = $this->formatFlightDateTime($flightdata->checkinDesks[0]->checkinOpenTime);
                $checkinCloseTime = $this->formatFlightDateTime($flightdata->checkinDesks[0]->checkinCloseTime);
                $nowTime = date_create('now')->setTimezone(new DateTimeZone('America/New_York'));

                // Display flight if checkinOpenTime is <= now and checkinCloseTime >= now
                // MARCO - Changing the order here so it will be easier to read the logic
                if (($nowTime >= $checkinOpenTime) && ($nowTime <= $checkinCloseTime)) {

                    $fliteredFlightData[] = $this->formatFilteredFlightData($flightdata);
                } else {
                    continue;
                }
            }
        }

        return $fliteredFlightData;
    }

    public function getFlightDataForEndcapFids()
    {

        $flightsData = $this->callFlightDataApi();
        $fliteredFlightData = [];

        if ($flightsData) {

            foreach ($flightsData as $flightdata) {

                $checkinOpenTime = $this->formatFlightDateTime($flightdata->checkinDesks[0]->checkinOpenTime);
                $checkinOpenTime->modify('-1 hours');
                $checkinCloseTime = $this->formatFlightDateTime($flightdata->checkinDesks[0]->checkinCloseTime);
                $nowTime = date_create('now')->setTimezone(new DateTimeZone('America/New_York'));

                // Display flight if (checkinOpenTime - 1hr) is <= now and checkinCloseTime >= now
                // MARCO - Changing the order here so it will be easier to read the logic
                if (($nowTime >= $checkinOpenTime) && ($nowTime <= $checkinCloseTime)) {
                    $fliteredFlightData[] = $this->formatFilteredFlightData($flightdata);
                }
            }
        }
        return $fliteredFlightData;
    }

    public function getInUseRows()
    {

        $flightsData = $this->callFlightDataApi();
        $fliteredFlightData = [];

        if ($flightsData) {

            foreach ($flightsData as $flightdata) {

                $checkinOpenTime = $this->formatFlightDateTime($flightdata->checkinDesks[0]->checkinOpenTime);
                //$checkinOpenTime->modify('-1 hours');
                $checkinCloseTime = $this->formatFlightDateTime($flightdata->checkinDesks[0]->checkinCloseTime);
                $nowTime = date_create('now')->setTimezone(new DateTimeZone('America/New_York'));

                // Display flight if (checkinOpenTime - 1hr) is <= now and checkinCloseTime >= now
                // MARCO - Changing the order here so it will be easier to read the logic
                if (($nowTime >= $checkinOpenTime) && ($nowTime <= $checkinCloseTime)) {

                    $fliteredFlightData[] = $this->formatFilteredFlightData($flightdata);
                }
            }
        }

        return $fliteredFlightData;
    }

    public function formatFilteredFlightData($flightdata)
    {
        return [
            'publicCarrierCode' => $flightdata->publicCarrierCode,
            'destIATACode' => $flightdata->destIATACode,
            'publicFlightIdentity' => $flightdata->publicFlightIdentity,
            'scheduledTime' => $this->formatFlightDateTime($flightdata->scheduledTime)->format('Y-m-d\TH:i:s\Z'),
            'flightStatusCode' => $flightdata->flightStatusCode,
            'estimatedOffBlockTime' => (isset($flightdata->estimatedOffBlockTime)) ? $flightdata->estimatedOffBlockTime : '',
            'gate' => (isset($flightdata->gates[0]->gate)) ? $flightdata->gates[0]->gate : '',
            'checkinRow' => (isset($flightdata->checkinDesks[0]->checkinRow)) ? $flightdata->checkinDesks[0]->checkinRow : '',
            'codeShares' => (isset($flightdata->codeShares)) ? $flightdata->codeShares : '',
            'checkinDeskRange' => $flightdata->checkinDesks[0]->checkinDeskRange,
            'vias' => (isset($flightdata->vias)) ? $flightdata->vias : '',
        ];
    }

    public function callFlightDataApi($params = null)
    {

        try {
            $response['success'] = true;
            $url = config('jfk.JFK_FLIGHT_API_BASE_URL');
            $params['direction'] = config('jfk.JFK_FLIGHT_API_DIRECTION');
            $params['airport'] = config('jfk.JFK_FLIGHT_API_AIRPORT');

            $startTime = date_create('now');
            $endTime = date_create('now');

            $startTime->modify(config('jfk.JFK_FLIGHT_API_START_TIME'));
            $endTime->modify(config('jfk.JFK_FLIGHT_API_END_TIME'));
            $params['scheduledTimeStart'] = '2023-11-08T08:55:00Z'; #$startTime->format('Y-m-d\TH:i:s\Z');
            $params['scheduledTimeEnd'] = $endTime->format('Y-m-d\TH:i:s\Z');

            $client = new Client();
            $headers = [
                'Ocp-Apim-Subscription-Key' => config('jfk.JFK_FLIGHT_API_SUBSCRIPTION_KEY'),
            ];
            $request = $client->request(
                'GET',
                $url,
                [
                    'query' => $params,
                    'headers' => $headers,
                ]
            );
            $response['statusCode'] = $request->getStatusCode();
            $response['data'] = $request->getBody()->getContents();

            if ($response['statusCode'] === 200) {
                $flightsData = json_decode($response['data']);

                $fliteredFlightData = [];


                foreach ($flightsData as $flightdata) {
                    // Filtering for checkin info
                    if (
                        !isset($flightdata->checkinDesks) ||
                        !isset($flightdata->checkinDesks[0]->checkinRow) ||
                        !isset($flightdata->checkinDesks[0]->checkinOpenTime) ||
                        !isset($flightdata->checkinDesks[0]->checkinCloseTime) ||
                        !isset($flightdata->checkinDesks[0]->checkinDeskRange)
                    ) {
                        continue;
                    }
                    // Filtering for Code Share Status
                    if (isset($flightdata->codeShareStatus) && $flightdata->codeShareStatus === 'SF') {
                        continue;
                    }
                    #dup flights with multi destinations
                    if (isset($flightdata->vias)){
                        foreach ($flightdata->vias as $via) {
                            if (isset($via->viaIATACode)){
                                $dupflight = clone $flightdata;
                                $dupflight->destIATACode = $via->viaIATACode;
                                $dupflight->vias = [];
                                //print_r($via->viaIATACode);
                                $flightsData[] = $dupflight;
                            }
                        }
                    }
                    $fliteredFlightData[] = $flightdata;
                }

            } else {
                return ;
            }

            return $fliteredFlightData;

        } catch (Exception $e) {
            return $response = [
                'success' => false,
                'message' => $e->getMessage() . ' in file ' . $e->getFile() . ' on line number: ' . $e->getLine(),
            ];
        }
    }

    public function callWaitTimesApi($params = null)
    {

        try {
            $url = config('jfk.JFK_FLIGHT_APIWAITTIMES_URL');

            $client = new Client();
            $headers = [
                'Subscription-Key' => config('jfk.JFK_FLIGHT_APIWAITTIMES_SUBSCRIPTION_KEY'),
            ];
            $request = $client->request(
                'GET',
                $url,
                [
                    'headers' => $headers,
                ]
            );

            $response['data'] = json_decode($request->getBody()->getContents());

            return $response['data'];
        } catch (Exception $e) {
            return $response = [
                'success' => false,
                'message' => $e->getMessage() . ' in file ' . $e->getFile() . ' on line number: ' . $e->getLine(),
            ];
        }
    }

    public function callSOAPCounters($params = null)
    {

        try {

            for ($i = 1; $i <= 3; $i++) {

                $logTime = date_create('now');

                $this->info($logTime->format('Y-m-d\TH:i:s\Z') . ' - StatusRequest');
                //sleep(1);

                // First - Check Subscription Status
                $this->SOAPCall('StatusRequest');

                $this->info($logTime->format('Y-m-d\TH:i:s\Z') . ' - GetMessage');
                $array = $this->SOAPCall('GetMessage');

                if (array_key_exists('message', $array)) {

                    if ($array['message'] === 'Down' || $array['message'] === 'Canceled') {
                        // Try to Subcribe again.
                        $this->info($logTime->format('Y-m-d\TH:i:s\Z') . ' - Subscription DOWN - Trying to Subscribe again');
                        $this->SOAPCall('Subscription');
                        Planner::truncate();
                        sleep(5);
                        $this->info($logTime->format('Y-m-d\TH:i:s\Z') . ' - GetMessage');
                        $array = $this->SOAPCall('GetMessage');
                        if ($array['message'] === 'Accepted') {
                            $this->info($logTime->format('Y-m-d\TH:i:s\Z') . ' - Subscription Accepted');
                            sleep(1);
                        }
                    } else {
                        //Keep going subsctrion still UP
                        $this->info($logTime->format('Y-m-d\TH:i:s\Z') . ' - Subscription UP');
                    }
                } else {
                    $this->StoreSOAPdata($array);
                }

                // Try get messages until ther is no more data available.
                for ($i = 1; $i <= 60; $i++) {
                    $this->info($logTime->format('Y-m-d\TH:i:s\Z') . ' - GetMessage - data Loop');
                    $array = $this->SOAPCall('GetMessage');

                    //print_r($array);
                    if (array_key_exists('message', $array)) {
                        if ($array['message'] === 'NoData') {
                            $this->info($logTime->format('Y-m-d\TH:i:s\Z') . ' - No data in the queue');
                        }
                    } else {
                        $this->StoreSOAPdata($array);
                    }
                }
            }

            return 'Done';
        } catch (Exception $e) {
            print_r($e->getMessage() . ' in file ' . $e->getFile() . ' on line number: ' . $e->getLine());

            return $response = [
                'success' => false,
                'message' => $e->getMessage() . ' in file ' . $e->getFile() . ' on line number: ' . $e->getLine(),
            ];
        }
    }

    public function SOAPCall($message)
    {

        $CurrentTime = date_create('now');

        if ($message === 'StatusRequest') {
            $payload = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:rdds="http://rdds.ws.schema.ultra-as.com" xmlns:stat="http://statusrequest.core.schema.ultra-as.com" xmlns:head="http://header.schema.ultra-as.com"><soapenv:Header/><soapenv:Body><rdds:StatusRequest><stat:Envelope><stat:Header><head:MessageSentDateTime>' . $CurrentTime->format('Y-m-d\TH:i:s\Z') . '</head:MessageSentDateTime><head:MessageSequenceNumber>0</head:MessageSequenceNumber><head:MessageType>StatusRequest</head:MessageType><head:SourceSystemID>SCALA</head:SourceSystemID><head:DestinationSystemID>AODB</head:DestinationSystemID></stat:Header></stat:Envelope></rdds:StatusRequest></soapenv:Body></soapenv:Envelope>';
        } elseif ($message === 'Subscription') {
            $payload = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:rdds="http://rdds.ws.schema.ultra-as.com" xmlns:sub="http://subscriptionrequest.rdds.schema.ultra-as.com" xmlns:head="http://header.schema.ultra-as.com"><soapenv:Header/><soapenv:Body><rdds:RDDSSubscriptionRequest><sub:Envelope xsi:schemaLocation="http://subscriptionrequest.rdds.schema.ultra-as.com RDDSSubscriptionRequest.xsd" xmlns:rdds="http://rdds.ws.schema.ultra-as.com" xmlns:sub="http://subscriptionrequest.rdds.schema.ultra-as.com" xmlns:head="http://header.schema.ultra-as.com"><sub:Header><head:MessageSentDateTime>' . $CurrentTime->format('Y-m-d\TH:i:s\Z') . '</head:MessageSentDateTime><head:MessageSequenceNumber>1</head:MessageSequenceNumber><head:MessageType>RDDSSubscriptionRequest</head:MessageType><head:SourceSystemID>SCALA</head:SourceSystemID><head:DestinationSystemID>AODB</head:DestinationSystemID></sub:Header><sub:Body><sub:RDDSSubscriptionRequest><sub:ResourceDataCategory>CheckinOperation</sub:ResourceDataCategory><sub:SubscriptionMode>SnapshotThenUpdates</sub:SubscriptionMode></sub:RDDSSubscriptionRequest></sub:Body></sub:Envelope></rdds:RDDSSubscriptionRequest></soapenv:Body></soapenv:Envelope>';
        } elseif ($message === 'GetMessage') {
            $payload = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:rdds="http://rdds.ws.schema.ultra-as.com" xmlns:get="http://getmessage.ws.schema.ultra-as.com" xmlns:head="http://header.schema.ultra-as.com"><soapenv:Header/><soapenv:Body><rdds:GetMessage><get:Envelope><get:Header><head:MessageSentDateTime>' . $CurrentTime->format('Y-m-d\TH:i:s\Z') . '</head:MessageSentDateTime><head:MessageSequenceNumber>0</head:MessageSequenceNumber><head:MessageType>WSRequest</head:MessageType><head:SourceSystemID>SCALA</head:SourceSystemID><head:DestinationSystemID>AODB</head:DestinationSystemID></get:Header></get:Envelope></rdds:GetMessage></soapenv:Body></soapenv:Envelope>';
        } elseif ($message === 'CancelSubscription') {
            $payload = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:rdds="http://rdds.ws.schema.ultra-as.com" xmlns:sub="http://subscriptionrequest.rdds.schema.ultra-as.com" xmlns:head="http://header.schema.ultra-as.com"><soapenv:Header/><soapenv:Body><rdds:CancelSubscription><sub:Envelope xsi:schemaLocation="http://subscriptionrequest.rdds.schema.ultra-as.com CancelSubscription.xsd" xmlns:rdds="http://rdds.ws.schema.ultra-as.com" xmlns:sub="http://subscriptionrequest.rdds.schema.ultra-as.com" xmlns:head="http://header.schema.ultra-as.com"><sub:Header><head:MessageSentDateTime>' . $CurrentTime->format('Y-m-d\TH:i:s\Z') . '</head:MessageSentDateTime><head:MessageSequenceNumber>1</head:MessageSequenceNumber><head:MessageType>CancelSubscription</head:MessageType><head:SourceSystemID>SCALA</head:SourceSystemID><head:DestinationSystemID>AODB</head:DestinationSystemID></sub:Header></sub:Envelope></rdds:CancelSubscription></soapenv:Body></soapenv:Envelope>';
        }

        try {
            $url = config('jfk.JFK_FLIGHT_SOAP_URL');
            //$url = 'https://dev-api.jfkiat.com/checkindesk/stratacache';

            $client = new Client();
            $headers = [
                'SOAPAction' => 'AcceptMessageOperation',
                'Content-Type' => 'text/xml; charset=utf-8',
            ];
            $auth = [
                config('jfk.JFK_FLIGHT_SOAP_USER'),
                config('jfk.JFK_FLIGHT_SOAP_PASSWORD'),
            ];
            $request = $client->request(
                'POST',
                $url,
                [
                    'headers' => $headers,
                    'auth' => $auth,
                    'body' => $payload,
                ]
            );

            $array = $this->xml2array($request->getBody()->getContents(), $get_attributes = 3, $priority = 'tag');

            if ($message === 'GetMessage') {

                $message = $array['S:Envelope']['S:Body']['res:GetMessageResponse'];
                //print_r($message);

                if (array_key_exists('res:NoData', $message)) {
                    return ['message' => 'NoData'];
                }
                if (array_key_exists('data:Envelope', $message)) {
                    return $message['data:Envelope']['data:Body']['data:RDDSResourceData'];
                }
                $body = $message['ns1:Envelope']['ns1:Body'];
                if (array_key_exists('ns1:StatusResponse', $body)) {
                    return ['message' => $body['ns1:StatusResponse']['ns1:ServiceStatus']];
                }
                if ((array_key_exists('ns1:SubscriptionResponse', $body))) {
                    return ['message' => $body['ns1:SubscriptionResponse']['ns1:RequestStatus']];
                }
                if ((array_key_exists('ns1:CancelSubscription', $body))) {
                    return ['message' => 'Canceled'];
                }
                if ((array_key_exists('ns1:SnapshotStart', $body))) {
                    return ['message' => 'SnapshotStart'];
                }
                if ((array_key_exists('ns1:SnapshotEnd', $body))) {
                    return ['message' => 'SnapshotEnd'];
                }

                return ['message' => 'Unknow Error'];
            }

            return $array;
        } catch (Exception $e) {
            return [$e->getMessage() => ' in file ' . $e->getFile() . ' on line number: ' . $e->getLine()];
        }
    }

    public function StoreSOAPdata($data): void
    {
        $tofile = $results = print_r($data, true);
        $logdatetime = date_create();
        $logdatetime->setTimezone(new DateTimeZone('America/New_York'));

        #$this->info($data['data:ResourceData']['common:CheckinOperation']['common:Identification']['common:CheckinDeskID']);
        $CheckinDeskID = $data['data:ResourceData']['common:CheckinOperation']['common:Identification']['common:CheckinDeskID'];

        if (mb_strlen($CheckinDeskID) === 4){
            $tmpRow = mb_substr($CheckinDeskID, 0, 1);
            $tmpCounter = mb_substr($CheckinDeskID, 2, 4);
        } else {
            Log::channel('slack')->info("Ignoring irrelevant data $CheckinDeskID");
            ##Ignoring irrelevant data
            return;
        }

        if (Counter::where([['row', $tmpRow],['counter_location', $tmpCounter]])->doesntExist()) {
            Log::channel('slack')->info("Ignoring if counter does not exisits $CheckinDeskID");
            ##Ignoring if counter does not exisits
            return;
        }

        if (array_key_exists('common:FlightIdentity', $data['data:ResourceData']['common:CheckinOperation']['common:Identification'])) {
            $this->info($data['data:ResourceData']['common:CheckinOperation']['common:Identification']['common:FlightIdentity']);
            $FlightIdentity = $data['data:ResourceData']['common:CheckinOperation']['common:Identification']['common:FlightIdentity'];
        }
        if (array_key_exists('common:AirlineIATACode', $data['data:ResourceData']['common:CheckinOperation']['common:Identification'])) {
            if (gettype($data['data:ResourceData']['common:CheckinOperation']['common:Identification']['common:AirlineIATACode']) === 'array') {
                $this->info(implode(PHP_EOL, $data['data:ResourceData']['common:CheckinOperation']['common:Identification']['common:AirlineIATACode']));
                $FlightIdentity = implode(' ', $data['data:ResourceData']['common:CheckinOperation']['common:Identification']['common:AirlineIATACode']);
            } else {
                $this->info($data['data:ResourceData']['common:CheckinOperation']['common:Identification']['common:AirlineIATACode']);
                $FlightIdentity = $data['data:ResourceData']['common:CheckinOperation']['common:Identification']['common:AirlineIATACode'];
            }
        }
        #echo $data['data:ResourceData']['common:CheckinOperation']['common:Identification']['common:CheckinPlanCloseDateTime'];
        #echo $data['data:ResourceData']['common:CheckinOperation']['common:Identification']['common:CheckinPlanOpenDateTime'];
        $CheckinPlanCloseDateTime = $this->formatSOAPDateTime($data['data:ResourceData']['common:CheckinOperation']['common:Identification']['common:CheckinPlanCloseDateTime']);
        $CheckinPlanOpenDateTime = $this->formatSOAPDateTime($data['data:ResourceData']['common:CheckinOperation']['common:Identification']['common:CheckinPlanOpenDateTime']);

        $FlightOriginDate = null;
        $CheckinClassCode = null;
        $CheckinCloseDateTime = null;
        $CheckinOpenDateTime = null;

        if (array_key_exists('common:FlightOriginDate', $data['data:ResourceData']['common:CheckinOperation']['common:Identification'])) {
            #echo $data['data:ResourceData']['common:CheckinOperation']['common:Identification']['common:FlightOriginDate'];
            $FlightOriginDate = $this->formatSOAPDateTime($data['data:ResourceData']['common:CheckinOperation']['common:Identification']['common:FlightOriginDate']);
            $search = [
                ['checkindesk', $CheckinDeskID],
                ['flight_identity', $FlightIdentity],
                //['flight_origin_date', $FlightOriginDate], #Fix for counter staggering opening
                ['checkin_plan_close_date_time', $CheckinPlanCloseDateTime],
                ['checkin_plan_open_date_time', $CheckinPlanOpenDateTime],
            ];
        } else {
            $search = [
                ['checkindesk', $CheckinDeskID],
                ['flight_identity', $FlightIdentity],
                ['checkin_plan_close_date_time', $CheckinPlanCloseDateTime],
                ['checkin_plan_open_date_time', $CheckinPlanOpenDateTime],
            ];
        }
        if (array_key_exists('common:CheckinClassCode', $data['data:ResourceData']['common:CheckinOperation'])) {
            $this->info($data['data:ResourceData']['common:CheckinOperation']['common:CheckinClassCode']);
            $CheckinClassCode = $data['data:ResourceData']['common:CheckinOperation']['common:CheckinClassCode'];
        }
        if (array_key_exists('common:CheckinCloseDateTime', $data['data:ResourceData']['common:CheckinOperation'])) {
            $this->info($data['data:ResourceData']['common:CheckinOperation']['common:CheckinCloseDateTime']);
            $CheckinCloseDateTime = $this->formatSOAPDateTime($data['data:ResourceData']['common:CheckinOperation']['common:CheckinCloseDateTime']);
        }
        if (array_key_exists('common:CheckinOpenDateTime', $data['data:ResourceData']['common:CheckinOperation'])) {
            $this->info($data['data:ResourceData']['common:CheckinOperation']['common:CheckinOpenDateTime']);
            $CheckinOpenDateTime = $this->formatSOAPDateTime($data['data:ResourceData']['common:CheckinOperation']['common:CheckinOpenDateTime']);
        }

        if ($data['data:AmendmentType'] === 'Create') {
            $counter = Planner::create([
                'checkindesk' => $CheckinDeskID,
                'flight_identity' => $FlightIdentity,
                'checkin_plan_close_date_time' => $CheckinPlanCloseDateTime,
                'checkin_plan_open_date_time' => $CheckinPlanOpenDateTime,
                'flight_origin_date' => $FlightOriginDate,
                'checkin_close_date_time' => $CheckinCloseDateTime,
                'checkin_open_date_time' => $CheckinOpenDateTime,
                'class_code' => $CheckinClassCode,
            ]);
        } elseif ($data['data:AmendmentType'] === 'Update') {
            if ($CheckinCloseDateTime) {
                $update = [
                    'checkin_close_date_time' => $CheckinCloseDateTime,
                ];
            }
            if ($CheckinOpenDateTime) {
                $update = [
                    'checkin_open_date_time' => $CheckinOpenDateTime,
                    'class_code' => $CheckinClassCode,
                ];
            }
            #$counter = Planner::where($search)->update($update); #Chaging to Update or Create
            $counter = Planner::updateOrCreate(
                $search,
                $update
            );

        } elseif ($data['data:AmendmentType'] === 'Delete') {
            $counter = Planner::where($search)->delete();
        } else {
            $this->info('---New AmendmentType Type');
            $this->info($data['data:AmendmentType']);
        }

        $message = [
            'action' => $data['data:AmendmentType'],
            'checkindesk' => $CheckinDeskID,
            'flight_identity' => $FlightIdentity,
            'checkin_plan_close_date_time' => (isset($CheckinPlanCloseDateTime)) ? $CheckinPlanCloseDateTime->format('Y-m-d\TH:i:s') : '',
            'checkin_plan_open_date_time' => (isset($CheckinPlanOpenDateTime)) ? $CheckinPlanOpenDateTime->format('Y-m-d\TH:i:s') : '',
            'flight_origin_date' => $FlightOriginDate,
            'checkin_close_date_time' => (isset($CheckinCloseDateTime)) ? $CheckinCloseDateTime->format('Y-m-d\TH:i:s'): '',
            'checkin_open_date_time' => (isset($CheckinOpenDateTime)) ? $CheckinOpenDateTime->format('Y-m-d\TH:i:s'): '',
            'class_code' => $CheckinClassCode,
        ];
        Log::channel('slack')->info(json_encode($message, JSON_PRETTY_PRINT));
    }

    private function xml2array($contents, $get_attributes = 1, $priority = 'tag')
    {
        if (!$contents) {
            return [];
        }
        if (!function_exists('xml_parser_create')) {
            // print "'xml_parser_create()' function not found!";
            return [];
        }
        // Get the XML parser of PHP - PHP must have this module for the parser to work
        $parser = xml_parser_create('');
        xml_parser_set_option($parser, XML_OPTION_TARGET_ENCODING, 'UTF-8');
        xml_parser_set_option($parser, XML_OPTION_CASE_FOLDING, 0);
        xml_parser_set_option($parser, XML_OPTION_SKIP_WHITE, 1);
        xml_parse_into_struct($parser, trim($contents), $xml_values);
        xml_parser_free($parser);
        if (!$xml_values) {
            return;
        } //Hmm...
        // Initializations
        $xml_array = [];
        $parents = [];
        $opened_tags = [];
        $arr = [];
        $current = &$xml_array; //Refference
        // Go through the tags.
        $repeated_tag_index = []; //Multiple tags with same name will be turned into an array
        foreach ($xml_values as $data) {
            unset($attributes, $value); //Remove existing values, or there will be trouble
            // This command will extract these variables into the foreach scope
            // tag(string), type(string), level(int), attributes(array).
            extract($data); //We could use the array by itself, but this cooler.
            $result = [];
            $attributes_data = [];
            if (isset($value)) {
                if ($priority === 'tag') {
                    $result = $value;
                } else {
                    $result['value'] = $value;
                } //Put the value in a assoc array if we are in the 'Attribute' mode
            }
            // Set the attributes too.
            if (isset($attributes) && $get_attributes) {
                foreach ($attributes as $attr => $val) {
                    if ($attr === 'ResStatus') {
                        $current[$attr][] = $val;
                    }
                    if ($priority === 'tag') {
                        $attributes_data[$attr] = $val;
                    } else {
                        $result['attr'][$attr] = $val;
                    } //Set all the attributes in a array called 'attr'
                }
            }
            // See tag status and do the needed.
            //echo"<br/> Type:".$type;
            if ($type === 'open') { //The starting of the tag '<tag>'
                $parent[$level - 1] = &$current;
                if (!is_array($current) || (!in_array($tag, array_keys($current)))) { //Insert New tag
                    $current[$tag] = $result;
                    if ($attributes_data) {
                        $current[$tag . '_attr'] = $attributes_data;
                    }
                    //print_r($current[$tag . '_attr']);
                    $repeated_tag_index[$tag . '_' . $level] = 1;
                    $current = &$current[$tag];
                } else { //There was another element with the same tag name
                    if (isset($current[$tag][0])) { //If there is a 0th element it is already an array
                        $current[$tag][$repeated_tag_index[$tag . '_' . $level]] = $result;
                        $repeated_tag_index[$tag . '_' . $level]++;
                    } else { //This section will make the value an array if multiple tags with the same name appear together
                        $current[$tag] = [
                            $current[$tag],
                            $result,
                        ]; //This will combine the existing item and the new item together to make an array
                        $repeated_tag_index[$tag . '_' . $level] = 2;
                        if (isset($current[$tag . '_attr'])) { //The attribute of the last(0th) tag must be moved as well
                            $current[$tag]['0_attr'] = $current[$tag . '_attr'];
                            unset($current[$tag . '_attr']);
                        }
                    }
                    $last_item_index = $repeated_tag_index[$tag . '_' . $level] - 1;
                    $current = &$current[$tag][$last_item_index];
                }
            } elseif ($type === 'complete') { //Tags that ends in 1 line '<tag />'
                // See if the key is already taken.
                if (!isset($current[$tag])) { //New Key
                    $current[$tag] = $result;
                    $repeated_tag_index[$tag . '_' . $level] = 1;
                    if ($priority === 'tag' && $attributes_data) {
                        $current[$tag . '_attr'] = $attributes_data;
                    }
                } else { //If taken, put all things inside a list(array)
                    if (isset($current[$tag][0]) && is_array($current[$tag])) { //If it is already an array...
                        // ...push the new element into that array.
                        $current[$tag][$repeated_tag_index[$tag . '_' . $level]] = $result;
                        if ($priority === 'tag' && $get_attributes && $attributes_data) {
                            $current[$tag][$repeated_tag_index[$tag . '_' . $level] . '_attr'] = $attributes_data;
                        }
                        $repeated_tag_index[$tag . '_' . $level]++;
                    } else { //If it is not an array...
                        $current[$tag] = [
                            $current[$tag],
                            $result,
                        ]; //...Make it an array using using the existing value and the new value
                        $repeated_tag_index[$tag . '_' . $level] = 1;
                        if ($priority === 'tag' && $get_attributes) {
                            if (isset($current[$tag . '_attr'])) { //The attribute of the last(0th) tag must be moved as well
                                $current[$tag]['0_attr'] = $current[$tag . '_attr'];
                                unset($current[$tag . '_attr']);
                            }
                            if ($attributes_data) {
                                $current[$tag][$repeated_tag_index[$tag . '_' . $level] . '_attr'] = $attributes_data;
                            }
                        }
                        $repeated_tag_index[$tag . '_' . $level]++; //0 and 1 index is already taken
                    }
                }
            } elseif ($type === 'close') { //End of tag '</tag>'
                $current = &$parent[$level - 1];
            }
        }

        return $xml_array;
    }

    private function formatSOAPDateTime($datetimetoformat)
    {

        if (mb_strlen($datetimetoformat) === 16) {
            $date = mb_substr($datetimetoformat, 0, 10);
        } else {
            $date = DateTime::createFromFormat('Y-m-d\TH:i:sT', $datetimetoformat);
            $date->setTimezone(new DateTimeZone('America/New_York'));
        }

        return $date;
    }

    private function formatFlightDateTime($datetimetoformat)
    {

        $date = DateTime::createFromFormat('Y-m-d\TH:i:s\Z', $datetimetoformat);
        $date->setTimezone(new DateTimeZone('America/New_York'));

        return $date;
    }

    private function info($log): void
    {

        echo $log . PHP_EOL;
    }
}
