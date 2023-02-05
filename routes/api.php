<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\VendorController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\PurchaseController;
use App\Http\Controllers\API\SaleController;

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
    
    Route::apiResource("/items", ItemController::class);
    Route::post("/item", [ItemController::class, "getItemByItemNumber"]);
    Route::get("/items-total-unit-price", [ItemController::class, "getTotalUnitPrice"]);

    Route::apiResource("/vendors", VendorController::class);
    Route::apiResource("/customers", CustomerController::class);

    Route::apiResource("/purchases", PurchaseController::class);
    Route::get("/purchases-total-quantity", [PurchaseController::class, "getTotalQuantity"]);
    Route::get("/purchases-total-unit-price", [PurchaseController::class, "getTotalUnitPrice"]);
    Route::get("/purchases-total-total-cost", [PurchaseController::class, "getTotalTotalCost"]);

    Route::apiResource("/sales", SaleController::class);
    Route::get("/sales-total-quantity", [SaleController::class, "getTotalQuantity"]);
    Route::get("/sales-total-unit-price", [SaleController::class, "getTotalUnitPrice"]);
    Route::get("/sales-total-total-cost", [SaleController::class, "getTotalTotalCost"]);

    Route::post("/logout", [AuthController::class, "logout"]);
});
Route::post("/login", [AuthController::class, "login"]);
Route::post("/signup", [AuthController::class, "signup"]);
Route::post("/resetpassword", [AuthController::class, "resetpassword"]);
