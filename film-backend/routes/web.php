<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilmController;

// Rute untuk Film
Route::prefix('films')->group(function () {
    Route::post('/', [FilmController::class, 'store']);  // Menyimpan film baru
    Route::get('/', [FilmController::class, 'index']);   // Mengambil semua film
    Route::get('/{id}', [FilmController::class, 'show']); // Menampilkan film berdasarkan ID
});

Route::get('/', function () {
    return view('welcome');
});
