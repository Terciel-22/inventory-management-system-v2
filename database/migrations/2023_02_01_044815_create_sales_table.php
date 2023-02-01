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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->integer('item_number');
            $table->integer('customer_id');
            $table->string('customer_name');
            $table->string('item_name');
            $table->date('sale_date');
            $table->integer('discount')->unsigned();
            $table->integer('quantity')->unsigned();
            $table->decimal('unit_price', 12, 2)->unsigned();
            $table->decimal('total_cost', 12, 2)->unsigned();
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
        Schema::dropIfExists('sales');
    }
};
