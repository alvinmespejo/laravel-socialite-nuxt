<?php

namespace App\Http\Middleware;

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
        $services = ['facebook', 'google', 'linkedin', 'github', 'bitbucket', 'slack'];
        if (!in_array($request->get('service', null), $services)) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Invalid service provider',
                    'success' => false
                ], Response::HTTP_FORBIDDEN);
            }

            return redirect()->back();
        }

        return $next($request);
    }
}
