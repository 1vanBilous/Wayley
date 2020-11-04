<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shedules extends Model
{
    protected $fillable = [
        'sights_id', 'fullWeek', 'mon_o', 'mon_c', 'tue_o', 'tue_c', 'wed_o', 'wed_c', 'thu_o', 'thu_c', 'fri_o', 'fri_c', 'sat_o', 'sat_c', 'sun_o', 'sun_c'
    ];

    public function setfullWeekAttribute($value)
    {
    	$this->attributes["fullWeek"] = (boolean)($value);
    }

    protected $table = 'Shedules';
}
