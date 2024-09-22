<?php

use App\Http\Controllers\FilmController;

Route::post('/films', [FilmController::class, 'store']);
