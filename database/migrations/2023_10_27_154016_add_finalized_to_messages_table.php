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
        Schema::table('messages', function (Blueprint $table): void {
            $table->boolean('finalized')->default(false)->after('json_data');
            $table->json('preview_data')->nullable()->after('finalized');
            $table->boolean('new')->default(true)->after('finalized');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('messages', function (Blueprint $table): void {
            $table->dropColumn('finalized');
            $table->dropColumn('new');
            $table->dropColumn('preview_data');
        });
    }
};
