<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MapPointsFields extends Model
{
    protected $fillable = [
        'content', 'field_type', 'lang',
    ];

    protected $table = 'map_points_fields';
}
