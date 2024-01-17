<?php

namespace App\Http\Controllers;

use App\Models\Router;
use App\Services\HelperMethods;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Laravel\Jetstream\Jetstream;

class ApiManagerController extends Controller
{
    protected $helperMethodsObj;

    protected $routerObj;

    public function __construct(HelperMethods $helperMethodsObj, Router $router)
    {
        $this->helperMethodsObj = $helperMethodsObj;
        $this->routerObj = $router;
    }

    /**
     * Show the user API token screen.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        if (!Gate::allows('tokens.read')) {
            $message = 'You do not have permission to read tokens.';

            return redirect()->back()->with('message', $message);
        }
        Jetstream::$permissions = [
            'airline',
            'destination',
            'planner',
            'user',
        ];
        $apiRoutes = collect($this->routerObj->router->getRoutes()->get());
        $filteredRoutes = [];
        foreach ($apiRoutes as $route) {
            if (($route->action['prefix'] === 'api')) {
                $filteredRoutes[] = $route;
            }
        }

        return Jetstream::inertia()->render($request, 'API/Index', [
            'tokens' => $request->user()->tokens->map(function ($token) {
                return $token->toArray() + [
                    'last_used_ago' => optional($token->last_used_at)->diffForHumans(),
                ];
            }),
            'availablePermissions' => Jetstream::$permissions,
            'defaultPermissions' => Jetstream::$defaultPermissions,
            'apiRoutes' => $filteredRoutes,
            'canReadTokens' => Gate::allows('tokens.index'),
            'canAddTokens' => Gate::allows('tokens.create'),
            'canEditTokens' => Gate::allows('tokens.edit'),
            'canDeleteTokens' => Gate::allows('tokens.destroy'),
        ]);
    }

    /**
     * Create a new API token.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        if (!Gate::allows('tokens.store')) {
            $message = 'You do not have permission to create tokens.';

            return redirect()->back()->with('message', $message);
        }
        try {
            $request->validate([
                'name' => ['required', 'string', 'max:255', 'unique:personal_access_tokens,name'],
                'permissions' => ['required', 'array', 'min:1', 'max:4'],
                'permissions.*' => ['string', 'in:airline,destination,planner,user'],
            ]);

            $token = $request->user()->createToken(
                $request->name,
                $request->input('permissions', [])
            );

            $changes = [
                'model' => 'Tokens',
                'action' => 'Personal Access Token Created',
                'permissions' => implode(', ', $request->input('permissions')),
            ];
            $this->helperMethodsObj->createAudit($request->user(), $changes);

            return back()->with('flash', [
                'token' => explode('|', $token->plainTextToken, 2)[1],
            ]);
        } catch (Exception $e) {
            $message = $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Update the given API token's permissions.
     *
     * @param  string  $tokenId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $tokenId)
    {
        if (!Gate::allows('tokens.update')) {
            $message = 'You do not have permission to update tokens.';

            return redirect()->back()->with('message', $message);
        }
        try {
            $request->validate([
                'permissions' => ['required', 'array', 'min:1', 'max:4'],
                'permissions.*' => ['string', 'in:airline,destination,planner,user'],
            ]);

            $token = $request->user()->tokens()->where('id', $tokenId)->firstOrFail();

            $token->forceFill([
                'abilities' => $request->input('permissions', []),
            ])->save();

            return back(303);
        } catch (Exception $e) {
            $message = $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }

    /**
     * Delete the given API token.
     *
     * @param  string  $tokenId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, $tokenId)
    {
        if (!Gate::allows('tokens.des†roy')) {
            $message = 'You do not have permission to delete tokens.';

            return redirect()->back()->with('message', $message);
        }
        try {
            $request->user()->tokens()->where('id', $tokenId)->first()->delete();

            return back(303);
        } catch (Exception $e) {
            $message = $e->getMessage();

            return redirect()->back()->with('message', $message);
        }
    }
}
