<?php

use App\Models\AirlinesBasic;
use App\Models\AirlinesLabelsLid;
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
        Schema::create('airlines_basic_airline_labels_lid', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('airlines_basic_id');
            $table->foreignId('airline_labels_lids_id');
            $table->timestamps();

            $table->unique(['airlines_basic_id', 'airline_labels_lids_id'], 'airlines_labels_index_unique');

        });
        $airlines = AirlinesBasic::all();
        foreach ($airlines as $airline) {
            $airlines_labels_lid = AirlinesLabelsLid::where('airline_id', $airline->id)->pluck('id')->toArray();
            $airline->airlinesLabelsLids()->sync($airlines_labels_lid);
            $airline->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('airlines_basic_airline_labels_lid');
    }
};
