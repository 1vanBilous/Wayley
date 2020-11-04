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

class StatisticController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $stats = Stat::orderBy('id', 'desc')->take(15)->get();

    	return view('statistic.mainList', compact('stats'));
    }

    public function user($user)
    {
        
    }
}
