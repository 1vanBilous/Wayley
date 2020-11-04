<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use App\Sights;
use App\sightsVocabular;
use App\Shedules;
use App\Photos;
use App\Routes;
use App\Points;
use App\RouteNames;
use App\Venues;
use App\Reviews;
use App\VenuesRoutes;
use App\Stat;
use DateTime;

class APIController extends Controller
{
    public function index()
    {
        return view('api.info');
    }  

    public function test()
    {
        $result = Sights::where('city', 'Kharkiv')->get();
        foreach ($result as $item) {
          $vocabular = sightsVocabular::where('sights_id', $item->id)->get();
          $item->vocabular = $vocabular;  
        }
        return json_encode($result);
    }
   
    

}

