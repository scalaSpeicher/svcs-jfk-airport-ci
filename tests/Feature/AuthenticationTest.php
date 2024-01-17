<?php

//uses(\Illuminate\Database\Eloquent\Model::class);
use App\Models\User;
use App\Providers\RouteServiceProvider;

//uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('login screen can be rendered', function (): void {
    $response = $this->get('/login');

    $response->assertStatus(200);
});

test('users can authenticate using the login screen', function (): void {
    $response = $this->post('/login', [
        'email' => 'matthew.speicher@scala.com',
        'password' => 'Natas420!!',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(RouteServiceProvider::HOME);
});

test('users can not authenticate with invalid password', function (): void {
    $user = User::find(62);

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});
