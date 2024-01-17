<?php

use App\Http\Controllers\TeamController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Laravel\Jetstream\Jetstream;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::post('/sanctum/token', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return $user->createToken($request->device_name)->plainTextToken;
});

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('planners.index', ['today_only' => 0, 'search_by' => 'open', 'active_only' => 1, 'sort' => 'checkindesk']);
    }

    return Inertia::render(
        'Auth/Login',
        [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]
    );

});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function (): void {
    Route::group(['middleware' => config('jetstream.middleware', ['web'])], function (): void {

        $authMiddleware = config('jetstream.guard')
            ? 'auth:' . config('jetstream.guard')
            : 'auth';

        $authSessionMiddleware = config('jetstream.auth_session', false)
            ? config('jetstream.auth_session')
            : null;

        Route::group(['middleware' => array_values(array_filter([$authMiddleware, $authSessionMiddleware, 'verified']))], function (): void {
            // Teams...
            if (Jetstream::hasTeamFeatures()) {
                Route::get('/teams/create', [TeamController::class, 'create'])->name('teams.create');
                Route::post('/teams', [TeamController::class, 'store'])->name('teams.store');
                Route::get('/teams/{team}', [TeamController::class, 'show'])->name('teams.show');
                Route::put('/teams/{team}', [TeamController::class, 'update'])->name('teams.update');
                Route::delete('/teams/{team}', [TeamController::class, 'destroy'])->name('teams.destroy');
                Route::put('/teams/{team}/members', 'App\Http\Controllers\TeamMemberController@store')->name('team-members.store');
                Route::post('/teams/{team}/members/{user}', 'App\Http\Controllers\TeamMemberController@update')->name('team-members.update');
                Route::delete('/teams/{team}/members/{user}', 'App\Http\Controllers\TeamMemberController@destroy')->name('team-members.destroy');
            }
        });
    });
    Route::group(['middleware' => ['auth', 'permission']], function (): void {

        /**
         * Token Routes
         */
        Route::group(['prefix' => 'tokens'], function (): void {
            Route::get('/', 'App\Http\Controllers\ApiManagerController@index')->name('tokens.index');
            Route::post('/create', 'App\Http\Controllers\ApiManagerController@store')->name('tokens.store');
            Route::put('/update/{token}', 'App\Http\Controllers\ApiManagerController@update')->name('tokens.update');
            Route::delete('/delete/{trash}', 'App\Http\Controllers\ApiManagerController@destroy')->name('tokens.destroy');
        });

        /**
         * User Routes
         */
        Route::group(['prefix' => 'users'], function (): void {
            Route::get('/', 'App\Http\Controllers\UserController@index')->name('users.index');
            Route::get('/create', 'App\Http\Controllers\UserController@create')->name('users.create');
            Route::post('/create', 'App\Http\Controllers\UserController@store')->name('users.store');
            Route::get('/edit/{user}', 'App\Http\Controllers\UserController@edit')->name('users.edit');
            Route::put('/update/{user}', 'App\Http\Controllers\UserController@update')->name('users.update');
            Route::delete('/delete/{user}', 'App\Http\Controllers\UserController@destroy')->name('users.destroy');
        });

        /**
         * Planner Routes
         */
        Route::group(['prefix' => 'planners'], function (): void {
            Route::get('/', 'App\Http\Controllers\PlannerController@index')->name('planners.index');
            Route::get('/create', 'App\Http\Controllers\PlannerController@create')->name('planners.create');
            Route::post('/create', 'App\Http\Controllers\PlannerController@store')->name('planners.store');
            Route::get('/edit/{planner}', 'App\Http\Controllers\PlannerController@edit')->name('planners.edit');
            Route::put('/update/{id}', 'App\Http\Controllers\PlannerController@update')->name('planners.update');
            Route::delete('/delete/{planner}', 'App\Http\Controllers\PlannerController@destroy')->name('planners.destroy');
        });

        /**
         * Override Routes
         */
        Route::group(['prefix' => 'overrides'], function (): void {
            Route::get('/', 'App\Http\Controllers\ManualOverrideController@index')->name('overrides.index');
            Route::delete('/delete/{planner}', 'App\Http\Controllers\ManualOverrideController@destroy')->name('overrides.destroy');
            Route::put('/restore/{planner}', 'App\Http\Controllers\ManualOverrideController@restore')->name('overrides.restore');
        });

        /**
         * Audit Routes
         */
        Route::group(['prefix' => 'audits'], function (): void {
            Route::get('/', 'App\Http\Controllers\AuditController@index')->name('audits.index');
        });

        /**
         * Counter Routes
         */
        Route::group(['prefix' => 'counters'], function (): void {
            Route::get('/', 'App\Http\Controllers\CounterController@index')->name('counters.index');
            Route::get('/create', 'App\Http\Controllers\CounterController@create')->name('counters.create');
            Route::post('/create', 'App\Http\Controllers\CounterController@store')->name('counters.store');
            Route::get('/edit/{counters}', 'App\Http\Controllers\CounterController@edit')->name('counters.edit');
            Route::put('/update/{counters}', 'App\Http\Controllers\CounterController@update')->name('counters.update');
            Route::delete('/delete/{counters}', 'App\Http\Controllers\CounterController@destroy')->name('counters.destroy');
        });

        /**
         * Role Routes
         */
        Route::group(['prefix' => 'roles'], function (): void {
            Route::get('/', 'App\Http\Controllers\RoleController@index')->name('roles.index');
            Route::get('/{role}/edit', 'App\Http\Controllers\RoleController@edit')->name('roles.edit');
            Route::put('/update/{role}', 'App\Http\Controllers\RoleController@update')->name('roles.update');
            Route::get('/create', 'App\Http\Controllers\RoleController@create')->name('roles.create');
            Route::post('/create', 'App\Http\Controllers\RoleController@store')->name('roles.store');
            Route::delete('/delete/{role}', 'App\Http\Controllers\RoleController@destroy')->name('roles.destroy');
        });

        /**
         * Destinations Routes
         */
        Route::group(['prefix' => 'destinations'], function (): void {
            Route::get('/', 'App\Http\Controllers\DestinationController@index')->name('destinations.index');
            Route::get('/create', 'App\Http\Controllers\DestinationController@create')->name('destinations.create');
            Route::post('/create', 'App\Http\Controllers\DestinationController@store')->name('destinations.store');
            Route::get('/edit/{destination}', 'App\Http\Controllers\DestinationController@edit')->name('destinations.edit');
            Route::put('/update/{destination}', 'App\Http\Controllers\DestinationController@update')->name('destinations.update');
            Route::delete('/delete/{destination}', 'App\Http\Controllers\DestinationController@destroy')->name('destinations.destroy');
        });

        /**
         * Airlines Routes
         */
        Route::group(['prefix' => 'airlines'], function (): void {
            Route::get('/', 'App\Http\Controllers\AirlinesBasicController@index')->name('airlines.index');
            Route::get('/create', 'App\Http\Controllers\AirlinesBasicController@create')->name('airlines.create');
            Route::post('/create', 'App\Http\Controllers\AirlinesBasicController@store')->name('airlines.store');
            Route::get('/edit/{airline}', 'App\Http\Controllers\AirlinesBasicController@edit')->name('airlines.edit');
            Route::put('/update/{airline}', 'App\Http\Controllers\AirlinesBasicController@update')->name('airlines.update');
            Route::delete('/delete/{airline}', 'App\Http\Controllers\AirlinesBasicController@destroy')->name('airlines.destroy');
        });

        /**
         * Airlines Branding Routes
         */
        Route::group(['prefix' => 'airlines_branding'], function (): void {
            Route::get('/create', 'App\Http\Controllers\AirlinesBrandingController@create')->name('airlines_branding.create');
            Route::post('/create', 'App\Http\Controllers\AirlinesBrandingController@store')->name('airlines_branding.store');
            Route::put('/update/{airlines_branding}', 'App\Http\Controllers\AirlinesBrandingController@update')->name('airlines_branding.update');
            Route::delete('/delete/{airlines_branding}', 'App\Http\Controllers\AirlinesBrandingController@destroy')->name('airlines_branding.destroy');
        });

        /**
         * Airlines Logos
         */
        Route::group(['prefix' => 'airlines_logos'], function (): void {
            Route::get('/create', 'App\Http\Controllers\AirlinesBrandingController@create')->name('airlines_logos.create');
            Route::post('/create', 'App\Http\Controllers\AirlinesBrandingController@store')->name('airlines_logos.store');
            Route::put('/update/{airlines_logos}', 'App\Http\Controllers\AirlinesBrandingController@update')->name('airlines_logos.update');
            Route::delete('/delete/{airlines_logos}', 'App\Http\Controllers\AirlinesBrandingController@destroy')->name('airlines_logos.destroy');
        });

        /**
         * Airlines Labels Lids Routes
         */
        Route::group(['prefix' => 'airlines_labels_lids'], function (): void {
            Route::get('/create', 'App\Http\Controllers\AirlinesLabelsLidController@create')->name('airlines_labels_lids.create');
            Route::post('/create', 'App\Http\Controllers\AirlinesLabelsLidController@store')->name('airlines_labels_lids.store');
            Route::put('/update/{airlines_labels_lids}', 'App\Http\Controllers\AirlinesLabelsLidController@update')->name('airlines_labels_lids.update');
            Route::delete('/delete/{airlines_labels_lids}', 'App\Http\Controllers\AirlinesLabelsLidController@destroy')->name('airlines_labels_lids.destroy');
        });

        /**
         * Template Routes
         */
        Route::group(['prefix' => 'templates'], function (): void {
            Route::get('/', 'App\Http\Controllers\TemplateController@index')->name('templates.index');
            Route::get('/preview', 'App\Http\Controllers\TemplateController@preview')->name('templates.preview');
            Route::get('/edit/{template}', 'App\Http\Controllers\TemplateController@edit')->name('templates.edit');
            Route::put('/update', 'App\Http\Controllers\TemplateController@update')->name('templates.update');
            Route::get('/create', 'App\Http\Controllers\TemplateController@create')->name('templates.create');
            Route::post('/create', 'App\Http\Controllers\TemplateController@store')->name('templates.store');
            Route::delete('/delete/{trash}', 'App\Http\Controllers\TemplateController@destroy')->name('templates.destroy');
            Route::delete('/thumbnail/delete/{id}', 'App\Http\Controllers\TemplateController@removeThumb')->name('template_thumb.destroy');
        });

        /**
         * Template Field Routes
         */
        Route::group(['prefix' => 'template_fields'], function (): void {
            Route::get('/', 'App\Http\Controllers\TemplateFieldController@index')->name('template_fields.index');
            Route::get('/edit/{template_field}', 'App\Http\Controllers\TemplateFieldController@edit')->name('template_fields.edit');
            Route::put('/update/{template_field}', 'App\Http\Controllers\TemplateFieldController@update')->name('template_fields.update');
            Route::get('/create', 'App\Http\Controllers\TemplateFieldController@create')->name('template_fields.create');
            Route::post('/create', 'App\Http\Controllers\TemplateFieldController@store')->name('template_fields.store');
            Route::delete('/delete/{template_field}', 'App\Http\Controllers\TemplateFieldController@destroy')->name('template_fields.destroy');
        });

        /**
         * Message Routes
         */
        Route::group(['prefix' => 'messages'], function (): void {
            Route::get('/', 'App\Http\Controllers\MessageController@index')->name('messages.index');
            Route::get('/edit/{message}', 'App\Http\Controllers\MessageController@edit')->name('messages.edit');
            Route::put('/update', 'App\Http\Controllers\MessageController@update')->name('messages.update');
            Route::put('/refresh', 'App\Http\Controllers\MessageController@refresh')->name('messages.refresh');
            //Route::get('/create', 'App\Http\Controllers\MessageController@view')->name('messages.view');
            Route::post('/create', 'App\Http\Controllers\MessageController@create')->name('messages.create');
            Route::post('/dupe/{id}', 'App\Http\Controllers\MessageController@dupe')->name('messages.dupe');
            Route::post('/unlock/{id}', 'App\Http\Controllers\MessageController@unlock')->name('messages.unlock');
            Route::post('/store', 'App\Http\Controllers\MessageController@store')->name('messages.store');
            Route::delete('/delete/{trash}', 'App\Http\Controllers\MessageController@destroy')->name('messages.destroy');
            Route::delete('/cancel/{id}', 'App\Http\Controllers\MessageController@cancel')->name('messages.cancel');
        });

        /**
         * Location Routes
         */
        Route::group(['prefix' => 'locations'], function (): void {
            Route::get('/', 'App\Http\Controllers\LocationController@index')->name('locations.index');
            Route::get('/edit/{location}', 'App\Http\Controllers\LocationController@edit')->name('locations.edit');
            Route::put('/update', 'App\Http\Controllers\LocationController@update')->name('locations.update');
            Route::get('/create/{location}', 'App\Http\Controllers\LocationController@create')->name('locations.create');
            Route::post('/create', 'App\Http\Controllers\LocationController@store')->name('locations.store');
            Route::delete('/delete/{location}', 'App\Http\Controllers\LocationController@destroy')->name('locations.destroy');
        });

        /**
         * Schedule Routes
         */
        Route::group(['prefix' => 'schedules'], function (): void {
            Route::get('/', 'App\Http\Controllers\ScheduleController@index')->name('schedules.index');
            Route::get('/edit/{schedule}', 'App\Http\Controllers\ScheduleController@edit')->name('schedules.edit');
            Route::put('/update', 'App\Http\Controllers\ScheduleController@update')->name('schedules.update');
            Route::get('/create/{schedule}', 'App\Http\Controllers\ScheduleController@create')->name('schedules.create');
            Route::post('/create', 'App\Http\Controllers\ScheduleController@store')->name('schedules.store');
            Route::delete('/delete/{schedule}', 'App\Http\Controllers\ScheduleController@destroy')->name('schedules.destroy');
        });
    });
});
