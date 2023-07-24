<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/', function () {
    return ['message' => "Bienvenue sur l'API MoneyValue"];
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


// Route::middleware(['auth:sanctum'])->resource('/currencies', "App\Http\Controllers\CurrencyController", ['except' => ['index', 'show']]);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::resource('/currencies', "App\Http\Controllers\CurrencyController", ['except' => ['index', 'show']]);
    Route::resource('/pairs', "App\Http\Controllers\PairController", ['except' => ['index', 'show']]);


    Route::get('/apiConfig', 'App\Http\Controllers\ApiController@getApiConfig');
    Route::put('/apiConfig', 'App\Http\Controllers\ApiController@setApiConfig');
    
});

// Le middleware verifie si l'api est en maintance et restreint l'accès aux non connectés
Route::group([ 'middleware' => 'check.api'], function () {

    //Devises
    Route::get('/currencies', "App\Http\Controllers\CurrencyController@index");
    Route::get('/currencies/all', "App\Http\Controllers\CurrencyController@getAllCurrencies");
    Route::get('/currencies/pairs', "App\Http\Controllers\CurrencyController@getCurrenciesWithPairs");
    Route::get('/currencies/{currency}', "App\Http\Controllers\CurrencyController@show");
    
    
    //Paires
    Route::get('/pairs', "App\Http\Controllers\PairController@index");
    Route::get('/pairs/{pair}', "App\Http\Controllers\PairController@show");
    Route::get('/pairs/{from}/{to}/{amount}', "App\Http\Controllers\PairController@convert");
    
    
    //ping
    Route::get('/ping', 'App\Http\Controllers\ApiController@ping');
});

