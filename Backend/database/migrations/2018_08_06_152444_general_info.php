<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GeneralInfo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cityInfo', function (Blueprint $table) {
            $table->increments('id');

            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('language')->nullable();
            $table->string('valute')->nullable();
            $table->string('timezone')->nullable();

            $table->string('longitude');
            $table->string('latitude');

            $table->string('picture1')->nullable();
            $table->string('picture2')->nullable();
            $table->string('picture3')->nullable();

            $table->timestamps();
        });

        Schema::create('cityTranslations', function (Blueprint $table) {
            $table->increments('id');

            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('language')->nullable();
            $table->text('description')->nullable();

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
        Schema::dropIfExists('cityInfo');
        Schema::dropIfExists('cityTranslations');
    }
}
