<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('airlines_labels_lids', function ($table): void {
            $table->dropUnique(['label', 'airline_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('airlines_labels_lids', function ($table): void {
            $table->unique(['label', 'airline_id']);
        });
    }
};
