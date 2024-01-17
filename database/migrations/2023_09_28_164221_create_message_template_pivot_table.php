<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMessageTemplatePivotTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('message_template', function (Blueprint $table): void {
            $table->unsignedBigInteger('message_id')->index();
            $table->foreign('message_id')->references('id')->on('messages');
            $table->unsignedBigInteger('template_id')->index();
            $table->foreign('template_id')->references('id')->on('templates');
            $table->primary(['message_id', 'template_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('message_template');
    }
}
