<?php

use App\Http\Controllers\UssdController;
use Illuminate\Support\Facades\Route;

Route::post('/ussd/callback', [UssdController::class, 'handle']);
Route::post('/ussd/notify', [UssdController::class, 'notify']);
