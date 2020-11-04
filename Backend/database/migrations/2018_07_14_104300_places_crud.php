<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PlacesCrud extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('venues', function (Blueprint $table) {
            $table->increments('id');

            $table->string('country');
            $table->string('city');

            $table->string('nameLat');
            $table->string('nameCyr');
            $table->string('picture')->nullable();  //original/cuted
            $table->string('picture2')->nullable(); //small
            $table->string('picture3')->nullable(); // 

            $table->longText('tags')->nullable();

            $table->integer('price')->nullable();// $-$$$$

            $table->string('category')->nullable(); // type - bar, restaurant

            $table->string('addressCyr')->nullable();
            $table->string('addressLat')->nullable();

            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            
            $table->integer('deleted')->nullable(); //bad way, use instead - soft deleting

            $table->string('website')->nullable();
            $table->string('phone')->nullable();

            $table->integer('author'); //for custom 

            $table->timestamps();
        });

        Schema::create('venues_routes', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('route_id');
            $table->integer('venue_id');

            $table->timestamps();
        });

        Schema::create('reviews', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('venue_id');
            $table->string('user_uid')->nullable();
            $table->text('review_text')->nullable();
            $table->integer('rating')->nullable();
            $table->string('user_email')->nullable();
            $table->integer('approved')->nullable();

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
        Schema::dropIfExists('venues');
        Schema::dropIfExists('venues_routes');
        Schema::dropIfExists('reviews');
    }
}
