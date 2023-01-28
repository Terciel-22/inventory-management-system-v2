<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('mobile');
            $table->string('telephone')->nullable();;
            $table->string('email');
            $table->string('address');
            $table->string('region');
            $table->string('province')->nullable();;
            $table->string('city_municipality');
            $table->string('barangay');
            $table->string('status')->default('active');;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendors');
    }
};
