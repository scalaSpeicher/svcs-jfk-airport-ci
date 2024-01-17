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
        Schema::create('airlines_labels_lids', function (Blueprint $table): void {
            $table->id();
            $table->unsignedBigInteger('airline_id')->nullable();
            $table->foreign('airline_id')->references('id')->on('airlines');
            $table->string('label');
            $table->unique(['label', 'airline_id']);
            $table->json('default_counters')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->foreign('created_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('airlines_labels_lids');
    }
};
