<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDbAdditionalPlaces extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('map_points', function (Blueprint $table) {
            $table->increments('id');
            
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            
            $table->string('type');//POI
            $table->string('county')->nullable();
            $table->string('city')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('map_points_fields', function (Blueprint $table) {
            $table->increments('id');
            $table->string('content')->nullable();
            $table->string('field_type');
            $table->string('lang')->default('en');
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
        Schema::dropIfExists('map_points');
    }
}
