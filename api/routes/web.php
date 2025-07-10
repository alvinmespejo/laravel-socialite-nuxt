<?php

use App\Http\Controllers\api\Auth\SocialAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('test', function () {
    // dd(cookie('laravel_session'));
    //     dd(Socialite::driver('google')->stateless()->redirect()->targetUrl);
    // dd(Hash::make('password'));
});


Route::group(['prefix' => 'auth'], function () {
    Route::get('/{provider}/redirect', [SocialAuthController::class, 'redirect'])->name('web.social.redirect');
    Route::get('/{provider}/callback', [SocialAuthController::class, 'callback'])->name('web.social.callback');
});
