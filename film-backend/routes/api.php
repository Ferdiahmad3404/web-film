<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\CommentController;

// Rute untuk Film
Route::prefix('films')->group(function () {
    Route::post('/', [FilmController::class, 'store']);  // Menyimpan film baru
    Route::post('/{id}/comments', [CommentController::class, 'addComment'])->middleware('jwt.auth');
    Route::post('/comments/{commentId}/reply', [CommentController::class, 'addReply']);
    Route::get('/', [FilmController::class, 'index']);   // Mengambil semua film
    Route::get('/{id}', [FilmController::class, 'show']); // Menampilkan film berdasarkan ID
    Route::get('/{id}/comments', [CommentController::class, 'getComments']);
});

// Rute untuk otentikasi
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('jwt.auth');
Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('jwt.auth');

Route::get('auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [AuthController::class, 'handleGoogleCallback']);
