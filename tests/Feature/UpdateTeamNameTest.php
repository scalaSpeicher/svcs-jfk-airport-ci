<?php

uses(\Illuminate\Database\Eloquent\Model::class);
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('team names can be updated', function (): void {
    $this->actingAs($user = User::factory()->withPersonalTeam()->create());

    $response = $this->put('/teams/' . $user->currentTeam->id, [
        'name' => 'Test Team',
    ]);

    expect($user->fresh()->ownedTeams)->toHaveCount(1);
    expect($user->currentTeam->fresh()->name)->toEqual('Test Team');
});
