<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RoutesAndOtherTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Routes', function (Blueprint $table) {
            $table->increments('id');

            $table->float('amount')->nullable();
            $table->integer('places')->default(0);
            $table->float('duration')->nullable();
            $table->float('distance')->nullable();

            $table->string('picture')->nullable();
            $table->string('country');
            $table->string('city');
            $table->timestamps();
        });

        Schema::create('Points', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('route_id');

            $table->integer('venue_id')->nullable();
            $table->integer('order');

            $table->float('latitude')->nullable();
            $table->float('longitude')->nullable();

            $table->timestamps();
        });
        
        Schema::create('RouteName', function (Blueprint $table) {
            $table->increments('id');
            $table->string('language');
            $table->string('name');
            $table->integer('route_id');
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
        Schema::dropIfExists('Routes');
        Schema::dropIfExists('Points');
        Schema::dropIfExists('RouteName');
    }
}
