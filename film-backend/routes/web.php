<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\ActorController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\AwardController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CMSCommentController;

// Rute untuk Film
Route::prefix('films')->group(function () {
    Route::post('/', [FilmController::class, 'store']);
    Route::get('/', [FilmController::class, 'index']); 
    Route::get('/{id}', [FilmController::class, 'show']); 
});

// Rute untuk Countries
Route::prefix('countries')->group(function () {
    Route::post('/', [CountryController::class, 'store']);
    Route::get('/', [CountryController::class, 'index']);
    Route::put('/{id}', [CountryController::class, 'update']);
    Route::delete('/{id}', [CountryController::class, 'destroy']);
});

// Rute untuk Actor
Route::prefix('actors')->group(function () {
    Route::post('/', [ActorController::class, 'store']);
    Route::get('/', [ActorController::class, 'index']);
    Route::put('/{id}', [ActorController::class, 'update']);
    Route::delete('/{id}', [ActorController::class, 'destroy']);
});

// Rute untuk Genre
Route::prefix('genres')->group(function () {
    Route::post('/', [GenreController::class, 'store']);
    Route::get('/', [GenreController::class, 'index']);
    Route::put('/{id}', [GenreController::class, 'update']);
    Route::delete('/{id}', [GenreController::class, 'destroy']);
});

// Rute untuk Award
Route::prefix('awards')->group(function () {
    Route::post('/', [AwardController::class, 'store']);
    Route::get('/', [AwardController::class, 'index']);
    Route::put('/{id}', [AwardController::class, 'update']);
    Route::delete('/{id}', [AwardController::class, 'destroy']);
});

// Rute untuk otentikasi
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('jwt.auth');
Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('jwt.auth');

// Rute untuk komentar
Route::get('/comments', [CMSCommentController::class, 'index']);
Route::put('/comments/{id}/approve', [CMSCommentController::class, 'approve']);
Route::delete('/comments/{id}', [CMSCommentController::class, 'destroy']);
Route::delete('/comments/bulk-delete', [CMSCommentController::class, 'bulkDelete']); // For bulk deletion
