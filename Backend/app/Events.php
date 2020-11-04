<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    protected $fillable = [
        'city', 'country', 'latitude', 'logitude', 'address',
        'language', 'name', 'description', 'picture', 'category', 
        'places', 'tookPlaces', 'tickets', 'info', 'eventDate', 
        'author', 'organisation'
    ];

    protected $table = 'events';
}
