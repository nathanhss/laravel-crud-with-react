<?php

use App\Http\Controllers\PhoneController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('/users', [UsersController::class, 'index'])->name('users.index');
Route::post('/users', [UsersController::class, 'store'])->name('users.store');
Route::get('/users/{user}', [UsersController::class, 'show'])->name('users.show');
Route::put('/users/{user}', [UsersController::class, 'update'])->name('users.update');
Route::delete('/users/{user}', [UsersController::class, 'destroy'])->name('users.destroy');

Route::get('/phones', [PhoneController::class, 'index'])->name('phones.index');
Route::post('/phones', [PhoneController::class, 'store'])->name('phones.store');
Route::get('/phones/{phone}', [PhoneController::class, 'show'])->name('phones.show');
Route::put('/phones/{phone}', [PhoneController::class, 'update'])->name('phones.update');
Route::delete('/phones/{phone}', [PhoneController::class, 'destroy'])->name('phones.destroy');
