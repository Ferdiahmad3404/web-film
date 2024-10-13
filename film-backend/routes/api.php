<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilmController;

// Rute untuk Film
Route::prefix('films')->group(function () {
    Route::post('/', [FilmController::class, 'store']);  // Menyimpan film baru
    Route::get('/', [FilmController::class, 'index']);   // Mengambil semua film
    Route::get('/{id}', [FilmController::class, 'show']); // Menampilkan film berdasarkan ID
});

// Rute untuk otentikasi
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('jwt.auth');
Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('jwt.auth');
