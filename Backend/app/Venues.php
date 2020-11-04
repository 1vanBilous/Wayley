<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Venues extends Model
{
    protected $fillable = [
        'country', 'city', 'nameLat', 'nameCyr',
        'picture', 'tags','price', 'category', 'address', 
        'latitude','longitude', 'website', 
        'phone', 'author', 'deleted'
    ];

    protected $table = 'venues';

    public function setTagsAttribute($value)
    {
        $this->attributes['tags'] = strtolower(preg_replace('/\s+/', '', $value));
    }

    public function getPictureAttribute($value)
	{
			return 'http://'.request()->getHttpHost().'/images/venues/'.$value;
	}
}
