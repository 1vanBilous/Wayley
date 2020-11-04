<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Points extends Model
{
    protected $fillable = [
        'route_id', 'venue_id', 'order', 'latitude', 'longitude',
    ];

    protected $table = 'Points';
}
