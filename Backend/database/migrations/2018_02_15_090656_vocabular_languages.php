<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;


class VocabularLanguages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mainVocabular', function (Blueprint $table) {
            $table->increments('id');
            $table->string('language');
            $table->string('field');
            $table->longText('content')->nullable();
            $table->timestamps();
        });


        Schema::create('sightsVocabular', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sights_id');
            $table->string('language');
            $table->string('field');
            $table->longText('content')->nullable();
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
         Schema::dropIfExists('sightsVocabular');
         Schema::dropIfExists('mainVocabular');
    }
}
