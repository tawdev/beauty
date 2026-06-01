<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\AdminController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/reviews', [ReviewController::class, 'index']);

// Admin Dashboard Endpoints
Route::get('/admin/stats', [AdminController::class, 'stats']);
Route::get('/admin/bookings', [AdminController::class, 'bookings']);
Route::put('/admin/bookings/{id}', [AdminController::class, 'updateBooking']);
Route::get('/admin/orders', [AdminController::class, 'orders']);
Route::put('/admin/orders/{id}', [AdminController::class, 'updateOrder']);

// Product Admin CRUD
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::post('/reviews', [ReviewController::class, 'store']);
});
