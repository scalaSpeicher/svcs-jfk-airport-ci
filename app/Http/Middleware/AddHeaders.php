<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AddHeaders
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        $response->header('Content-Security-Policy', "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: *");
        //$response->header('Content-Security-Policy', 'frame-ancestors https://jfk-airport-template-curbside.services.scala.com/');

        return $response;
    }
}
