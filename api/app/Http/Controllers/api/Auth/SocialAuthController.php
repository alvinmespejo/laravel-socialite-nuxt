<?php

namespace App\Http\Controllers\api\Auth;

use App\Exceptions\api\SocialMediaAuthException;
use App\Http\Controllers\Controller;
use App\Models\SocialAccount;
use App\Models\User;
use App\Response\ApiErrorResponse;
use App\Response\ApiSuccessResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Fortify\Fortify;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class SocialAuthController extends Controller
{
    public function redirect(Request $request)
    {
        $provider = $request->provider ?? null;
        // dd($request->isJson());
        // return response()->json([$request->isJson(), $request->wantsJson(), $request->expectsJson()]);
        if ($request->isJson() || $request->expectsJson()) {
            // return Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();
            return new ApiSuccessResponse([
                'url' => Socialite::driver($provider)->stateless()->redirect()->getTargetUrl()
            ]);
        } else {
            return Socialite::driver($provider)->redirect();
        }
    }

    public function callback(Request $request)
    {
        $provider = $request->provider ?? null;
        try {

            if ($request->isJson() || $request->expectsJson()) {
                $userProviderData = Socialite::driver($provider)->stateless()->user();
            } else {
                $userProviderData = Socialite::driver($provider)->user();
            }

            $providerId = $userProviderData->getId();
            $providerName = $userProviderData->getName();
            $providerEmail = $userProviderData->getEmail();
            $providerAvatar = $userProviderData->getAvatar();

            $user = User::firstOrCreate(
                ['email' => $providerEmail],
                [
                    'name' => $providerName,
                    'password' => Hash::make(\Illuminate\Support\Str::random(16)), // fake password
                ]
            );

            $socialAccount = new SocialAccount();
            $socialAccount->provider = $provider;
            $socialAccount->provider_id = $providerId;
            $socialAccount->provider_avatar = $providerAvatar;

            $user->socialAccounts()->updateOrCreate(
                [
                    'provider' => $provider,
                    'provider_id' => $providerId,
                    'user_id' => $user->id,
                ],
                [
                    'provider_avatar' => $providerAvatar
                ]
            );

            $user->update(['login_as' => $provider]);

            if ($request->isJson() || $request->expectsJson()) {
                $token = $user->createToken($request->device_name ?? 'auth_api_token')->plainTextToken;
                return new ApiSuccessResponse([
                    'access_token' => $token,
                    'token_type' => 'Beater'
                ]);

                // return redirect("http://localhost:3000/auth/social-callback?provider=$provider&access_token=$token&token_type=Bearer");
            } else {
                Auth::login($user, true);
            }

            return redirect("http://localhost:3000/auth/social-callback?provider=$provider");
        } catch (Throwable $th) {
            return new ApiErrorResponse($th, 'An error occured while processing request. Please try again.');
        }
    }
}
