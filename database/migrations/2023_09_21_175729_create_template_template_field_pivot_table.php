<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTemplateTemplateFieldPivotTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('template_template_field', function (Blueprint $table): void {
            $table->unsignedBigInteger('template_id')->index();
            $table->foreign('template_id')->references('id')->on('templates')->onDelete('cascade');
            $table->unsignedBigInteger('template_field_id')->index();
            $table->foreign('template_field_id')->references('id')->on('template_fields')->onDelete('cascade');
            $table->primary(['template_id', 'template_field_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_template_field');
    }
}
