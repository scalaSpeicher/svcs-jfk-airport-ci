<?php

namespace App\Services;

use App\Models\AirlinesBasic;
use App\Models\AirlinesLabelsLid;
use App\Models\Counter;
use App\Models\Planner;
use DateTimeZone;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Log;

class HelperMethods
{
    /**
     * Returns AirlineLabel details from label_id
     *
     * @param  int  $label_id
     */
    public function getAirlineLabelDetails($label_id): AirlinesLabelsLid
    {
        return AirlinesLabelsLid::findOrFail($label_id);
    }

    public function getCheckinDesks(): array
    {
        $checkins = [];
        $counters = Counter::orderBy('row')->orderBy('counter_location')->get();
        $counters->each(function ($counter) use (&$checkins): void {
            $checkins[] = $counter->row . '-' . sprintf('%02d', $counter->counter_location);
        });

        return $checkins;
    }

    public function getModelFromTable($table)
    {
        foreach (get_declared_classes() as $class) {
            if (is_subclass_of($class, 'Illuminate\Database\Eloquent\Model')) {
                $model = new $class();
                if ($model->getTable() === $table) {
                    return $class;
                }
            }
        }

        return false;
    }

    public function getActiveFlights()
    {
        $active_planner_flight_ids =
            Planner::betweenDates([$this->getNowTime()->subHours(8), $this->getNowTime()], 'checkin_open_date_time')
                ->orWhereBetween('checkin_plan_open_date_time', [$this->getNowTime()->subHours(8), $this->getNowTime()])
                ->where(\DB::raw('substr(checkindesk, 2, 1)'), '=', '-')
                ->where(\DB::raw('substr(checkindesk, 1, 1)'), '>=', 5)
                ->where(\DB::raw('substr(checkindesk, 1, 1)'), '<=', 9)
                ->distinct()->pluck('flight_identity')->toArray();

        $active_flights = Planner::whereIn('flight_identity', $active_planner_flight_ids)
            ->whereNull('checkin_close_date_time')
            ->where(function (Builder $query): void {
                $query->betweenDates([$this->getNowTime()->subHours(6), $this->getNowTime()], 'checkin_open_date_time')
                    ->orWhereBetween('checkin_plan_open_date_time', [$this->getNowTime(), $this->getNowTime()->addHours(6)]);
            });

        return $active_flights;
    }

    public function getNowTime()
    {
        return Carbon::parse(date_create('now')->setTimezone(new DateTimeZone('America/New_York')));
    }

    public function getAirlineLabelsFromPlanner($planner_id)
    {
        try {
            if (config('cache.model_caching')) {
                return Cache::store('request')->remember('airline_labels_for_planner' . $planner_id, 60 * 60 * 24, fn () => Planner::find($planner_id)->getAirlineLabels());
            }

            return Planner::find($planner_id)->getAirlineLabels();
        } catch (Exception $e) {
            Log::error($e->getMessage());
        }
    }

    /**
     * Returns AirlineBasic details from airline_id
     *
     * @param  int  $airline_id
     */
    public function getAirlineBasicDetails($airline_id): AirlinesBasic
    {
        return AirlinesBasic::findOrFail($airline_id);
    }

    public function createAudit(Model $model, $changes = [], $table = null, $id = null)
    {
        return $model->createAudit($model, $changes, $table, $id);
    }

    /**
     * Returns Counter from checkindesk (concat of [row]-[counter_location])
     *
     * @param  string  $checkin_desk
     * @return mixed
     */
    public function getCounterFromPlanner($checkin_desk): Counter
    {
        try {
            $checkinDesk = explode('-', $checkin_desk);
            if (is_numeric($checkinDesk[0]) && is_numeric($checkinDesk[1])) {
                $counter_location = (string) ((int) ($checkinDesk[1]));
                $counters = Counter::where('row', '=', "{$checkinDesk[0]}")
                    ->where('counter_location', '=', "{$counter_location}")
                    ->get();
                if ($counters) {
                    return $counters[0];
                }
            }
            abort(404, 'Cannot find check-in desk: ' . $checkin_desk);
        } catch (Exception $e) {
            $message = 'There was a problem adding new counter planner. ' . $e->getMessage();
            abort(500, $message);
        }
    }

    /**
     * Returns Label from flight_identity
     *
     * @param  string  $flight_identity
     */
    public function getLabelFromFlightIdentity($flight_identity): string
    {
        try {
            $iata = mb_substr($flight_identity, 0, 2);
            $airline = AirlinesBasic::where('iata', '=', "{$iata}")->get();
            if (count($airline) > 0) {
                return $airline->airlinesLabelsLids()->get('label');
            }
            $message = 'Cannot find flight identity: ' . $flight_identity;

            return redirect()->back()->with('message', $message);
        } catch (Exception $e) {
            $message = 'There was a problem adding new counter planner. ' . $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Returns a collection from an array of IDs and a table name.
     */
    public function getModelsFromIds(array $Ids, string $table, array $cols = []): Collection
    {
        if (count($cols) > 0) {
            $get_header_keys = DB::table($table)
                ->select($cols)
                ->whereIn('id', $Ids)->get();
        } else {
            $get_header_keys = DB::table($table)->whereIn('id', $Ids)->get();
        }

        return $get_header_keys;
    }

    /**
     * Returns a collection from an array of IDs and a table name.
     *
     * @param  Collection  $planners
     */
    public function getAirlineLabelsFromPlanners($planners): array
    {
        $airlineLabelsCleaned = [];

        foreach ($planners as $planner) {
            $airlineLabelsCleaned[$planner->id] = $this->getAirlineLabelsFromPlanner($planner->id)
                ->pluck('label', 'class_code')
                ->toArray();
        }

        return $airlineLabelsCleaned;
    }

    public function getItemsPerPageCookie(Request $request)
    {
        $itemsPerPage = 10;
        if (isset($_COOKIE['scalaCookies'])) {
            $scalcCookies = json_decode($_COOKIE['scalaCookies']);
            if (property_exists($scalcCookies, 'itemsPerPage')) {
                $pageItems = $scalcCookies->itemsPerPage;
                $uri = $request->path();
                if (isset($pageItems->{$uri})) {
                    $pageItemsPerPage = $pageItems->{$uri};
                    if ($pageItemsPerPage !== 'All') {
                        $itemsPerPage = (int) $pageItemsPerPage;
                    } else {
                        $itemsPerPage = 99999999999999;
                    }
                }
            }
        }
        if ($request->has('itemsPerPage')) {
            $itemsPerPage = (int) ($request->itemsPerPage);

            if ($request->itemsPerPage === 'All') {
                $itemsPerPage = 99999999999999;
            }
        }

        return $itemsPerPage;
    }
}
