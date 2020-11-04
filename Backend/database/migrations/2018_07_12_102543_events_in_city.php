<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EventsInCity extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');

            $table->string('country');
            $table->string('city');

            $table->string('language');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('picture')->nullable();
            $table->string('category')->nullable();
            $table->string('address')->nullable();

            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();

            $table->integer('places')->nullable();
            $table->integer('tookPlaces')->nullable();

            $table->string('tickets')->nullable();
            $table->string('info')->nullable();
            $table->date('eventDate');
            $table->time('eventTime');
            $table->integer('author');
            $table->string('organisation')->nullable();

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
        Schema::dropIfExists('events');
    }
}
