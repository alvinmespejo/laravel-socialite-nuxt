<?php

use App\Http\Controllers\api\Auth\SocialAuthController;
use App\Http\Controllers\api\UserController;
use App\Http\Resources\api\UserResource;
use App\Response\ApiSuccessResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return new ApiSuccessResponse(
        UserResource::make($request->user())
    );
})->middleware('auth:sanctum');

// Route::prefix('users')
//     ->middleware(['auth:sanctum'])
//     ->group(function () {
Route::resource('users', UserController::class)->middleware(['auth:sanctum']);
// })->name('users');

Route::group(['prefix' => 'auth'], function () {
    Route::get('/{provider}/redirect', [SocialAuthController::class, 'redirect'])->name('social.redirect');
    Route::get('/{provider}/callback', [SocialAuthController::class, 'callback'])->name('social.callback');
});
