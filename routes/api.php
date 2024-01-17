<?php

use App\Http\Controllers\api\AirlineDataController;
use App\Http\Controllers\api\PlayerController;
use Illuminate\Http\Request;

// use App\Models\User;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Validation\ValidationException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('auth:sanctum')->get('/user', fn (Request $request) => $request->user());

// Row LIDS
Route::get('/row-lids', [AirlineDataController::class, 'rowLids']);
// Row SSBD
Route::get('/row-ssbd', [AirlineDataController::class, 'rowSsbd']);
// EndCap WayFinder
Route::get('/endcap-wayfinder', [AirlineDataController::class, 'endcapWayfinder']);
// Row FIDS
Route::get('/row-fids', [AirlineDataController::class, 'rowFids']);
// EndCap FIDS
Route::get('/endcap-fids', [AirlineDataController::class, 'endcapFids']);
// Wait Times
Route::get('/wait-times', [AirlineDataController::class, 'waitTimes']);

/*
|--------------------------------------------------------------------------
| Player Data API Routes
|--------------------------------------------------------------------------
|
| Currently testing multiple auth methods, as well as multiple rate limiting
| and usage tracking methods for the player data API.
| - 12.01.23 - ms
|
*/
Route::get('/player-default', 'App\Http\Controllers\api\PlayerController@messageDefault')->name('player.default');
Route::get('/player-data', 'App\Http\Controllers\api\PlayerController@messageData')->name('player.data');
Route::get('/player-data/airline', [PlayerController::class, 'airlineData']);
Route::group(['middleware' => ['auth:sanctum', 'ability:airline']], function (): void {
    Route::get('/player-data/airline-auth', [PlayerController::class, 'airlineData']);
});
Route::middleware(['throttle:minute'])->group(function (): void {
    Route::get('/player-data/airline', [PlayerController::class, 'airlineData']);
});
Route::middleware(['throttle:user'])->group(function (): void {
    Route::get('/player-data/airline', [PlayerController::class, 'airlineData']);
});
Route::middleware(['throttle:session'])->group(function (): void {
    Route::get('/player-data/airline', [PlayerController::class, 'airlineData']);
});
