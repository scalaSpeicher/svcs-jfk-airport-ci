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
        Schema::create('template_fields', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->string('label')->nullable();
            $table->boolean('required')->default(0);
            $table->json('json_data')->nullable();
            $table->integer('max')->nullable();
            $table->integer('min')->nullable();
            $table->integer('lines')->nullable();
            $table->string('default');
            $table->boolean('internal')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_fields');
    }
};
