<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPlacesToSights extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sights', function (Blueprint $table) {
           $table->increments('id');
            //address
            $table->string('city');
            $table->string('location')->nullable();
            // rating 
            $table->integer('display')->nullable();
            // price for entrance
            $table->float('price', 8, 2)->nullable();
            $table->string('valute')->nullable();
            //basic information
            $table->string('phone')->nullable();
            $table->string('website')->nullable();
            $table->string('type')->nullable();
            $table->string('photo')->nullable();
            $table->timestamps();
        });

        Schema::create('photos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sights_id');
            $table->string('photo');
            $table->timestamps();
        });

        Schema::create('Shedules', function (Blueprint $table) {
           $table->increments('id');
            $table->integer('sights_id');
            
            $table->boolean('fullWeek')->default('0');

            $table->time('mon_o')->nullable();
            $table->time('mon_c')->nullable();

            $table->time('tue_o')->nullable();
            $table->time('tue_c')->nullable();

            $table->time('wed_o')->nullable();
            $table->time('wed_c')->nullable();
            
            $table->time('thu_o')->nullable();
            $table->time('thu_c')->nullable();

            $table->time('fri_o')->nullable();
            $table->time('fri_c')->nullable();

            $table->time('sat_o')->nullable();
            $table->time('sat_c')->nullable();
            
            $table->time('sun_o')->nullable();
            $table->time('sun_c')->nullable();
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
        Schema::dropIfExists('sights');
        Schema::dropIfExists('photos');
        Schema::dropIfExists('Shedules');
    }
}
