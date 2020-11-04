<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class sightsVocabular extends Model
{
    protected $fillable = [
        'sights_id', 'language', 'field', 'content',
    ];

    protected $table = 'sightsVocabular';
}
