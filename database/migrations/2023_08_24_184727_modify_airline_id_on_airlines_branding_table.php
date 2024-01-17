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
        Schema::table('airlines_branding', function (Blueprint $table): void {
            $table->renameColumn('airline_id', 'airlines_basic_id')->onDelete('cascade')->change();
            $table->id()->unique()->index()->first();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
