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
            $table->dropForeign(['airline_id']);
            $table->foreign('airlines_basic_id')
                ->references('id')->on('airlines')
                ->onDelete('cascade')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('airlines_branding', function (Blueprint $table): void {
            //
        });
    }
};
