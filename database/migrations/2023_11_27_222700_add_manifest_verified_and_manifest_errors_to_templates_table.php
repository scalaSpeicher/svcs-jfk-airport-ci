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
        Schema::table('templates', function (Blueprint $table): void {
            $table->boolean('manifest_verified')->default(false)->after('full_url');
            $table->text('manifest_errors')->nullable()->after('manifest_verified');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('templates', function (Blueprint $table): void {
            $table->dropColumn('manifest_verified');
            $table->dropColumn('manifest_errors');
        });
    }
};
