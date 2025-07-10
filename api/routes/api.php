<?php

use App\Http\Controllers\api\Auth\SocialAuthController;
use App\Response\ApiSuccessResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return new ApiSuccessResponse(
        $request->user()
    );
})->middleware('auth:sanctum');

Route::group(['prefix' => 'auth'], function () {
    Route::get('/{provider}/redirect', [SocialAuthController::class, 'redirect'])->name('social.redirect');
    Route::get('/{provider}/callback', [SocialAuthController::class, 'callback'])->name('social.callback');
});
