<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration
{
    /**
     * Run the migrations.
     * days col = 1 digit for each day of the week, starting with sunday
     * 1000000 = sunday, 0100000 = monday, 0010000 = tuesday, 0001000 = wednesday
     * 0000100 = thursday, 0000010 = friday, 0000001 = saturday
     */
    public function up(): void
    {
        Schema::create('schedules', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->enum('status', ['Open', 'Closed'])->default('Closed');
            $table->timestamp('open')->nullable();
            $table->timestamp('close')->nullable();
            $table->integer('days')->default(0000000);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
