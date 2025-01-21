<?php

use Illuminate\Support\Facades\Route;
use App\Livewire\EmbedWidget;

Route::view('/', 'welcome');

Route::view('dashboard', 'dashboard')
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::view('profile', 'profile')
    ->middleware(['auth'])
    ->name('profile');

Route::view('/test', 'test-page');

Route::group(['prefix' => 'onsite'], function () {
    Route::get('/modal', function () {
        return view('onsite.modal');
    });

    Route::get('/button', function () {
        return view('onsite.button')->with(['user' => request()->user ?? 'User']);
    });
});

Route::get('/embed-widget', EmbedWidget::class);

require __DIR__.'/auth.php';
