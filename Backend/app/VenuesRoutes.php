<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VenuesRoutes extends Model
{
    protected $fillable = [
        'route_id', 'venue_id'
    ];

    protected $table = 'venues_routes';
}
