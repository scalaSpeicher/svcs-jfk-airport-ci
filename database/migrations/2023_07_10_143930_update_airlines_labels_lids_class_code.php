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
            $table->string('class_code', 1)->nullable()->after('label');
            $table->unique(['class_code', 'airline_id']);
            $table->dropColumn('default_counters');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('airlines_labels_lids', function ($table): void {
            $table->json('default_counters')->nullable()->after('label');
            $table->dropColumn('class_code');
        });
    }
};
