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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('age');
            $table->tinyInteger('gender'); // 0 = male, 1 = female ,2 = other
            $table->integer('contact');
            $table->text('address');
            $table->text('medical_history');
            $table->text('profile_pic');
            $table->tinyInteger('is_deleted')->default('0'); // 0 = not deleted, 1 = deleted
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
