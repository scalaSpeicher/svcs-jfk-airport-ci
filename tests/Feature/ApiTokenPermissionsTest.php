<?php

//uses(\Illuminate\Database\Eloquent\Model::class);
use App\Models\User;
use Illuminate\Support\Str;
use Laravel\Jetstream\Features;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('api token permissions can be updated', function (): void {
    if (!Features::hasApiFeatures()) {
        $this->markTestSkipped('API support is not enabled.');

        return;
    }

    $this->actingAs($user = User::factory()->withPersonalTeam()->create());

    $token = $user->tokens()->create([
        'name' => 'Test Token',
        'token' => Str::random(40),
        'abilities' => ['create', 'read'],
    ]);

    $response = $this->put('/user/api-tokens/' . $token->id, [
        'name' => $token->name,
        'permissions' => [
            'delete',
            'missing-permission',
        ],
    ]);

    expect($user->fresh()->tokens->first()->can('delete'))->toBeTrue();
    expect($user->fresh()->tokens->first()->can('read'))->toBeFalse();
    expect($user->fresh()->tokens->first()->can('missing-permission'))->toBeFalse();
});
