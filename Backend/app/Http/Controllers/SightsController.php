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
use App\Photos;

class SightsController extends Controller
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
        $sights = Sights::all();
        foreach ($sights as $item) {
          $vocabular = sightsVocabular::where('sights_id', $item->id)->get();
          $shedule = Shedules::where('sights_id', $item->id)->get();
          $photos = Photos::where('sights_id', $item->id)->get();
          $item->vocabular = $vocabular;  
          //$item->shedule = $shedule; 
          //$item->photos = $photos;   
        } 
        return view('landmark.sightslist', compact('sights'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('landmark.sightCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SightsRequest $request)
    {
        $filename = '';
            
            if(Input::file())
        {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = public_path('/images/sights/' . $filename);
            Image::make($image->getRealPath())->save($path); 
        }    

            $sight = Sights::create([
            'city' => $request["city"],
            'location' => $request["location"],
            'price' => $request["price"],
            'valute' => $request["valute"],
            'phone' => $request["phone"],
            'website' => $request["website"],
            'type' => $request["sightType"],
            'display' => $request["display"],
            'photo' => $filename,
            ]);

            $shedule = Shedules::create([
            'sights_id' => $sight->id,
            'fullWeek' => $request["fullWeek"],
            'mon_o' => $request["mon_o"],
            'mon_c' => $request["mon_c"],

            'tue_o' => $request["tue_o"],
            'tue_c' => $request["tue_c"],

            'wed_o' => $request["wed_o"],
            'wed_c' => $request["wed_c"],

            'thu_o' => $request["thu_o"],
            'thu_c' => $request["thu_c"],

            'fri_o' => $request["fri_o"],
            'fri_c' => $request["fri_c"],

            'sat_o' => $request["sat_o"],
            'sat_c' => $request["sat_c"],

            'sun_o' => $request["sun_o"],
            'sun_c' => $request["sun_c"],
            ]);

        return redirect('sights/'.$sight->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //GO TO SightVocabularController to see handles with this info
        $vocabulars = sightsVocabular::where('sights_id', $id)
        ->orderBy('sights_id', 'desc')
        ->get();
        return view('landmark.sightVocabular', compact('vocabulars', 'id'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $sight = Sights::where('id', $id)->firstOrFail();
        $shedule = Shedules::where('sights_id', $id)->firstOrFail();
        return view('landmark.sightEdit', compact('sight','shedule'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
            $filename = Sights::where('id', $id)->firstOrFail()->getOriginal('photo');
            
            if(Input::file())
            {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = public_path('/images/sights/' . $filename);
            Image::make($image->getRealPath())->save($path); 
            }    

            $sight = Sights::where('id', $id)->firstOrFail()->update(array(
            'city' => $request["city"],
            'location' => $request["location"],
            'price' => $request["price"],
            'valute' => $request["valute"],
            'phone' => $request["phone"],
            'website' => $request["website"],
            'type' => $request["sightType"],
            'display' => $request["display"],
            'photo' => $filename,
            ));

            $shedule = Shedules::where('sights_id', $id)->firstOrFail()->update(array(
            'fullWeek' => $request["fullWeek"],
            'mon_o' => $request["mon_o"],
            'mon_c' => $request["mon_c"],

            'tue_o' => $request["tue_o"],
            'tue_c' => $request["tue_c"],

            'wed_o' => $request["wed_o"],
            'wed_c' => $request["wed_c"],

            'thu_o' => $request["thu_o"],
            'thu_c' => $request["thu_c"],

            'fri_o' => $request["fri_o"],
            'fri_c' => $request["fri_c"],

            'sat_o' => $request["sat_o"],
            'sat_c' => $request["sat_c"],

            'sun_o' => $request["sun_o"],
            'sun_c' => $request["sun_c"],
            ));            

        return redirect('/sights/'.$id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = Sights::where('id', $id)->delete();
        $result = sightsVocabular::where('sights_id', $id)->delete();
        $result = Shedules::where('sights_id', $id)->delete();
        $result = Photos::where('sights_id', $id)->delete();

        return redirect('/sights');
    }
}
