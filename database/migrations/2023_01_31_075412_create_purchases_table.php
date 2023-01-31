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
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->integer('item_number');
            $table->string('item_name');
            $table->decimal('unit_price', 12, 2)->unsigned();
            $table->integer('quantity')->unsigned();
            $table->decimal('total_cost', 12, 2)->unsigned();
            $table->string('vendor_name');
            $table->string('vendor_id');
            $table->date('purchase_date');
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
        Schema::dropIfExists('purchases');
    }
};
