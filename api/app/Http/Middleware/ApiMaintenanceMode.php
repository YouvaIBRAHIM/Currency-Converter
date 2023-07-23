<?php

namespace App\Http\Middleware;

use App\Models\Configuration;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class ApiMaintenanceMode
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            $apiConfiguration = Configuration::where('key', 'api')->firstOrfail();
            $apiConfiguration = json_decode($apiConfiguration->value);
    
            if (!$apiConfiguration->enabled) {
                return response()->json(['message' => $apiConfiguration->maintenance_message], 503);
            }
        }

        return $next($request);
    }
}
