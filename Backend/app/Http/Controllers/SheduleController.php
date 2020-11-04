<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\SightsRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Input;
use Auth;
use Image;
use App\Sights;
use App\sightsVocabular;
use App\Shedules;


class SheduleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($id)
    {
    	$Shedules = Shedules::where('sights_id', $id)->get();
    	return view('shedule.show', compact('Shedules', 'id'));
    }
}
