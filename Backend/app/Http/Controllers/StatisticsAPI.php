<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Stat;

class StatisticsAPI extends Controller
{
    public function statsGetVisit($user_uid, $page,$route_id){
        $stat = Stat::create([
            'user_uid' => $user_uid,
            'page' => $page,
            'place_id' => $route_id,
        ]);
    }
}
