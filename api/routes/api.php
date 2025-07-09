<?php

use App\Http\Controllers\api\Auth\SocialAuthController;
use App\Http\Middleware\SocialMediaOAuthMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/users', function (Request $request) {
    return response()->json([
        'message' => 'This is a protected route',
        'user' => 'Alvin M Espejo',
        'number' => random_int(1, 10000)
    ]);
});

Route::get('test', function () {
    // dd(Socialite::driver('google')->stateless()->redirect()->targetUrl);
    dd(Hash::make('password'));
});

Route::group(['prefix' => 'auth'], function () {
    Route::get('/login/{service}', [SocialAuthController::class, 'redirect']);
    Route::get('/login/{service}/callback', [SocialAuthController::class, 'callback']);
})->middlewareGroup('auth.social', [SocialMediaOAuthMiddleware::class]);
