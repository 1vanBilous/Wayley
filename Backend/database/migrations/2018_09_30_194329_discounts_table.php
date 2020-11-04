<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DiscountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('discounts', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('venue_id')->unique();
            $table->string('discount');
            $table->boolean('active')->default('1');   

            $table->timestamps();
        });

        Schema::create('discountsGenerated', function (Blueprint $table) {
            $table->increments('id');
            
            $table->integer('venue_id');
            $table->foreign('venue_id')->references('venue_id')->on('discounts');
            $table->string('key')->unique();

            $table->string('user')->nullable();


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
        Schema::dropIfExists('discounts');
        Schema::dropIfExists('discountsGenerated');
    }
}
