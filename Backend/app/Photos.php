<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Config;

class Photos extends Model
{
    protected $fillable = [
        'sights_id', 'photo',
    ];

    protected $table = 'sightsPhotos';

    public function getPhotoAttribute($value)
	{
			return 'http://'.request()->getHttpHost().'/images/sights/'.$value;
	}
}
