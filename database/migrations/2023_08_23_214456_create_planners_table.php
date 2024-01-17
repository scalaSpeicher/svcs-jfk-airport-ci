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
        Schema::rename('counter_planners', 'planners');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('planners', 'counter_planners');
    }
};
