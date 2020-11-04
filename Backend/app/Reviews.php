<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reviews extends Model
{
    protected $fillable = [
         'venue_id', 'user_uid', 'review_text', 
         'rating', 'user_email', 'approved',
    ];

    protected $table = 'reviews';
}
