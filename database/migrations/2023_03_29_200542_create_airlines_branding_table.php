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
        Schema::create('airlines_branding', function (Blueprint $table): void {
            $table->unsignedBigInteger('airline_id')->unique();
            $table->foreign('airline_id')->references('id')->on('airlines');
            $table->enum('mode', ['Light', 'Dark'])->nullable();
            $table->string('primary_color', 10)->nullable();
            $table->string('secondary_color', 10)->nullable();
            $table->string('tertiary_color', 10)->nullable();
            $table->string('font')->nullable();
            $table->string('font_color_primary', 10)->nullable();
            $table->string('font_color_secondary', 10)->nullable();
            $table->string('ssbd_logo')->nullable();
            $table->string('fids_color')->nullable();
            $table->string('logo_small_white')->nullable();
            $table->string('logo_small_color')->nullable();
            $table->string('logo_large_white')->nullable();
            $table->string('logo_large_color')->nullable();
            $table->string('lids_logo_large')->nullable();
            $table->string('endcap_fids_logo_small_color')->nullable();
            $table->string('wayfinding_arrow_color')->nullable();
            $table->string('brand_accent_image')->nullable();
            $table->string('lids_background_color', 10)->nullable();
            $table->string('lids_status_bar_color', 10)->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->foreign('updated_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('airlines_branding');
    }
};
