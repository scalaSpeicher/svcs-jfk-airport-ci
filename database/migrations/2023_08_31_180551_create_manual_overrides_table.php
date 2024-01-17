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
        Schema::create('manual_overrides', function (Blueprint $table): void {
            $table->id();
            $table->string('checkindesk');
            $table->string('flight_identity');
            $table->datetime('checkin_plan_close_date_time');
            $table->datetime('checkin_plan_open_date_time');
            $table->datetime('flight_origin_date')->nullable();
            $table->datetime('checkin_close_date_time')->nullable();
            $table->datetime('checkin_open_date_time')->nullable();
            $table->string('class_code')->nullable();
            $table->unsignedBigInteger('overridden_by')->nullable();
            $table->foreign('overridden_by')->references('id')->on('users');
            $table->boolean('deletion')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('manual_overrides');
        Schema::enableForeignKeyConstraints();
    }
};
