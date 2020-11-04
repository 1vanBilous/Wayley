<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Routes extends Model
{
    protected $fillable = [
        'amount', 'places', 'duration', 'distance', 'picture', 'country', 'city'
    ];

    public function getPictureAttribute($value)
	{
			return 'http://'.request()->getHttpHost().'/images/routes/'.$value;
	}

    protected $table = 'Routes';
}
