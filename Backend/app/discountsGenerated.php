<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class discountsGenerated extends Model
{
    protected $fillable = [
        'venue_id', 'key', 'user',
    ];

    protected $table = 'discountsGenerated';
}
