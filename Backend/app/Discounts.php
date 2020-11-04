<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Discounts extends Model
{
    protected $fillable = [
        'venue_id', 'discount', 'active', 'countPerWeek',
    ];

    protected $table = 'discounts';
}
