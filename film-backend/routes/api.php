<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CountryController; // Pastikan CountryController diimpor
use App\Http\Controllers\FilmController;
use Illuminate\Support\Facades\Route;

// Rute untuk Film
Route::prefix('films')->group(function () {
    Route::post('/', [FilmController::class, 'store']);  // Menyimpan film baru
    Route::get('/', [FilmController::class, 'index']);   // Mengambil semua film
    Route::get('/{id}', [FilmController::class, 'show']); // Menampilkan film berdasarkan ID
});

// Rute untuk Countries
Route::prefix('countries')->group(function () {
    Route::post('/', [CountryController::class, 'store'])->middleware('jwt.auth');
    Route::get('/', [CountryController::class, 'index']);  // Mengambil semua negara
    Route::put('/{id}', [CountryController::class, 'update']); // Memperbarui negara berdasarkan ID
    Route::delete('/{id}', [CountryController::class, 'destroy']); // Menghapus negara berdasarkan ID
});

// Rute untuk otentikasi
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('jwt.auth');
Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('jwt.auth');

Route::get('auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [AuthController::class, 'handleGoogleCallback']);
