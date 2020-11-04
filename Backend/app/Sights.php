<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Config;

class Sights extends Model
{
     protected $fillable = [
        'city', 'location', 'price', 'valute', 'phone', 'website', 'type', 'photo', 'display',
    ];

   /* public function setAbleAttribute($value)
    {
    	$this->attributes["able"] = (boolean)($value);
    }
	*/

	public function getPhotoAttribute($value)
	{
		return 'http://'.request()->getHttpHost().'/images/sights/'.$value;
        //
	}
}
