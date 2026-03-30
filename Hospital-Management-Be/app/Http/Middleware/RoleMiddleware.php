<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  array|string  $roles
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Check if user role is in allowed roles
        if (!in_array($user->role, $roles)) {
            return response()->json(['message' => 'Forbidden – You don’t have permission'], 403);
        }

        return $next($request);
    }
}
