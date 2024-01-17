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
        Schema::table('planners', function (Blueprint $table): void {
            $table->dropColumn('manual_override');
            $table->unsignedBigInteger('manual_override_id')->nullable()->after('class_code');
            $table->foreign('manual_override_id')->references('id')->on('manual_overrides');
            $table->dropForeign('counter_planners_updated_by_foreign');
            $table->dropColumn('updated_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('planners', function (Blueprint $table): void {
            $table->dropForeign('manual_override_id');
            $table->boolean('manual_override')->default(0);
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->foreign('updated_by')->references('id')->on('users');
        });
    }
};
