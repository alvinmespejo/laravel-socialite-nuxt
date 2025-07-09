<?php

namespace App\Http\Controllers\api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirect(Request $request)
    {
        $service = $request->service ?? null;
        return Socialite::driver($service)->stateless()->redirect();
    }

    public function callback(Request $request)
    {
        $service = $request->service ?? null;
        return Socialite::driver($service)->stateless()->user();
    }
}
