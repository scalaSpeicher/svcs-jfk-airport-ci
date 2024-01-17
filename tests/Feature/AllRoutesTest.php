<?php

it('stability-index-1', function ($url): void {
    $response = $this->post('/login', [
        'email' => 'matthew.speicher@scala.com',
        'password' => 'Natas420!!',
    ]);
    $response = $this->get($url);
    $response->assertStatus(200);
})->with(['/', '/planners?today_only=0&search_by=open&active_only=1&sort=checkindesk', '/overrides', '/users', '/airlines']);

test('stability-index-2', function ($url): void {
    $response = $this->get($url);
    $response->assertStatus(302);
})->with(['/counters', '/roles', '/destinations', '/audits']);

test('stability-create', function ($url): void {
    $response = $this->get($url);
    $response->assertStatus(302);
})->with(['/planners/create', '/users/create', '/roles/create', '/counters/create']);
