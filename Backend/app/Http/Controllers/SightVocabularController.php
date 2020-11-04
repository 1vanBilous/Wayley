<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Input;
use Auth;
use Image;
use App\Sights;
use Response;
use App\sightsVocabular;

class SightVocabularController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(Request $data)
    {
            $SV = sightsVocabular::create([
                    'sights_id' => $data->sights_id,
                    'language' => $data->language,
                    'field' => $data->field,
                    'content' => $data->content,
                    ]);

            return response()->json([
                "message" => "Created"
            ]);
    }

    public function getData($id){

        $vocabulars = sightsVocabular::where('sights_id', $id)
        ->orderBy('sights_id', 'desc')
        ->get();
        return view('landmark.phrasesListVocabular', compact('vocabulars'));
    }


    public function destroy($id)
    {
        $SV = sightsVocabular::where([
        ['id', '=', $id],
        ])->delete();

        return response()->json([
                "message" => "Deleted"
            ]);
    }
    
}
