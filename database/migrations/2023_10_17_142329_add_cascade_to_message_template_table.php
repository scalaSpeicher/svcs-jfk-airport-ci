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
        Schema::dropIfExists('message_template');
        Schema::create('message_template', function (Blueprint $table): void {
            $table->unsignedBigInteger('message_id')->index();
            $table->foreign('message_id')->references('id')->on('messages');
            $table->unsignedBigInteger('template_id')->index();
            $table->foreign('template_id')->references('id')->on('templates')->onDelete('cascade');
            $table->primary(['message_id', 'template_id']);
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('message_template', function (Blueprint $table): void {
            //
        });
    }
};
