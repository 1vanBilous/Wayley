<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stat extends Model
{
    protected $fillable = [
        'user_uid', 'page', 'place_id',
    ];

    protected $table = 'statistics';
}
