<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('airlines_basic_user', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('airlines_basic_id');
            $table->foreignId('user_id');
            $table->timestamps();

            $table->unique(['airlines_basic_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('airlines_basic_user');
    }
};
