<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\ApiRequestLog;
use Exception;
use Log;
use Carbon\Carbon;

class ApiRequestLogger
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $this->logRequest($request);

        return $next($request);
    }

        /**
     * @param Request $request
     */
    private function logRequest(Request $request): void
    {
        try {
            $auth_method = 'none';
            $token = null;
            $user = null;
            $bearerToken = $request->bearerToken();
            if (!is_null($bearerToken)) {
                $auth_method = 'token';
                $token = PersonalAccessToken::findToken($bearerToken);
                $user = $token->tokenable;
            }
            if (!is_null($request->user())) {
                $user = $request->user();
                $auth_method = 'sanctum';
            }
            $request_data = [
                'user' => ($user) ? $user->email : 'guest',
                'host' => $request->server('HTTP_HOST'),
                'route' => $request->server('REQUEST_URI'),
                'method' => $request->server('REQUEST_METHOD'),
                'user_agent' => $request->header('user-agent'),
                'size' => $request->server('CONTENT_LENGTH'),
                'ip' => $request->server('REMOTE_ADDR'),
                'protocol' => $request->server('SERVER_PROTOCOL'),
                'requested_at' => Carbon::parse($request->server('REQUEST_TIME'))->format('Y-m-d H:i:s'),
            ];
            ApiRequestLog::create([
                'user_id' => ($user) ? $user->id : null,
                'personal_access_token_id' => ($token) ? $token->id : null,
                'auth_method' => $auth_method,
                'request_data' => $request_data,
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
        }
    }

}
