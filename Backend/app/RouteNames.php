<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RouteNames extends Model
{
    protected $fillable = [
        'language', 'name', 'route_id',
    ];

    protected $table = 'RouteName';
}
