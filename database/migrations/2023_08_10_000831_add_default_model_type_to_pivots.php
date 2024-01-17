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
        Schema::disableForeignKeyConstraints();
        Schema::table('model_has_roles', function (Blueprint $table): void {
            $table->string('model_type')->default('App\Models\User')->change();
        });
        Schema::table('model_has_permissions', function (Blueprint $table): void {
            $table->string('model_type')->default('App\Models\User')->change();
        });
        // Schema::table('model_has_teams', function (Blueprint $table): void {
        //     $table->string('model_type')->default('App\Models\User')->change();
        // });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
