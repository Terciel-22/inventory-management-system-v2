<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\VendorController;
use App\Http\Controllers\API\CustomerController;

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

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post("/item", [ItemController::class, "getItemByItemNumber"]);
    Route::apiResource("/items", ItemController::class);
    Route::apiResource("/vendors", VendorController::class);
    Route::apiResource("/customers", CustomerController::class);
    Route::post("/logout", [AuthController::class, "logout"]);
});
Route::post("/login", [AuthController::class, "login"]);
Route::post("/signup", [AuthController::class, "signup"]);
Route::post("/resetpassword", [AuthController::class, "resetpassword"]);
