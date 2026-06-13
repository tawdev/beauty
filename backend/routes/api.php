<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\WebsiteSettingController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/admin/auto-login', [AuthController::class, 'adminAutoLogin']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/reviews', [ReviewController::class, 'index']);
Route::get('/settings', [WebsiteSettingController::class, 'show']);

Route::post('/bookings', [BookingController::class, 'store']);
Route::post('/orders', [OrderController::class, 'store']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/reviews', [ReviewController::class, 'store']);
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/stats', [AdminController::class, 'stats']);
    Route::get('/admin/bookings', [AdminController::class, 'bookings']);
    Route::put('/admin/bookings/{id}', [AdminController::class, 'updateBooking']);
    Route::get('/admin/orders', [AdminController::class, 'orders']);
    Route::put('/admin/orders/{id}', [AdminController::class, 'updateOrder']);
    Route::put('/admin/settings', [WebsiteSettingController::class, 'update']);
    Route::post('/admin/settings/logo', [WebsiteSettingController::class, 'uploadLogo']);

    Route::post('/products/upload-image', [ProductController::class, 'uploadImage']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
});
