<?php

uses(\Illuminate\Database\Eloquent\Model::class);
use App\Models\User;
use Laravel\Jetstream\Features;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('user accounts can be deleted', function (): void {
    if (!Features::hasAccountDeletionFeatures()) {
        $this->markTestSkipped('Account deletion is not enabled.');

        return;
    }

    $this->actingAs($user = User::factory()->create());

    $response = $this->delete('/user', [
        'password' => 'password',
    ]);

    expect($user->fresh())->toBeNull();
});

test('correct password must be provided before account can be deleted', function (): void {
    if (!Features::hasAccountDeletionFeatures()) {
        $this->markTestSkipped('Account deletion is not enabled.');

        return;
    }

    $this->actingAs($user = User::factory()->create());

    $response = $this->delete('/user', [
        'password' => 'wrong-password',
    ]);

    expect($user->fresh())->not->toBeNull();
});
