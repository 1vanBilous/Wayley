<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // <-- This is required

class MapPoints extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'latitude', 'longitude', 
        'type', 'country', 'city',
    ];

    protected $dates = ['deleted_at'];

    protected $table = 'map_points';
}
