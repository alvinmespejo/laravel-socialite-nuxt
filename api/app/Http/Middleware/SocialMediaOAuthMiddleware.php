<?php

namespace App\Http\Middleware;

use App\Models\SocialAccount;
use App\Response\ApiSuccessResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SocialMediaOAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!in_array($request->provider ?? null, SocialAccount::PROVIDERS)) {
            if ($request->expectsJson()) {
                // new ApiSuccessResponse([
                //     'message' => 'Invalid service provider',
                //     'success' => false
                // ], [], Response::HTTP_FORBIDDEN);

                return response()->json([
                    'error' => 'Invalid service provider'
                ], Response::HTTP_FORBIDDEN);
            }

            return redirect()->back();
        }

        return $next($request);
    }
}
