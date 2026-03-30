<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->integer('appointment_id');
            $table->integer('doctor_id');
            $table->integer('patient_id');
            $table->text('medication');
            $table->text('dosage');
            $table->text('duration');
            $table->tinyInteger(column: 'status')->default('0'); // 0 = pending, 1 = confirmed, 2 = cancelled
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescriptions');
    }
};
