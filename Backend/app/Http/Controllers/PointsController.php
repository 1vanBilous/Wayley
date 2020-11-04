<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Input;
use Auth;
use Image;
use App\Routes;
use App\RouteNames;
use App\Points;
use App\Sights;
use App\sightsVocabular;

use App\VenuesRoutes;
use App\Venues;

class PointsController extends Controller
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
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $data)
    {
        $result = Points::create([
        'route_id' => $data->route_id,
        'venue_id' => $data->venue_id,
        'order' => $data->order,
        'latitude' => $data->latitude,
        'longitude' => $data->longitude,
        ]);

        $route = Routes::where('id', $data->route_id)->increment('places');

    return response()->json([
        "message" => "Created"
    ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $points = Points::where('route_id', $id)
        ->orderBy('order', 'desc')
        ->get();

        foreach ($points as $item)
            if($item->venue_id!=0){
                $name = sightsVocabular::where([
                    ['sights_id', $item->venue_id],
                    ['language', 'rus'], 
                    ['field', 'name']])->first();
                $item->name = $name->content;
            }

        return view('routes.pointsList', compact('points'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $point = Points::where('id', $id)->first();
        $result = Points::where([
            ['id', '=', $id],
            ])->delete();
        
         $route = Routes::where('id', $point->route_id)->decrement('places');
            return response()->json([
                    "message" => "Deleted"
                ]);
        
        
    }

    public function assembleVenues($id)
    {
        $result =[];

        $route = Routes::where('id', $id)->first();

        $points = Points::where('route_id', $id)->get();

        $venues= Venues::where('city', $route->city)->get();

        foreach($venues as $venue){
            foreach($points as $point){
                //Point может быть привязан к Sight и не иметь координат, делаем проверку
                $pointCoord = [];//позиция точки
                if($point->venue_id=='0'){
                    array_push($pointCoord, $point->latitude, $point->longitude);
                }else{
                    $sight = Sights::where('id', $point->venue_id)->first();
                    $location = explode(";" ,$sight->location);
                    $pointCoord[0] = str_replace(" ","",$location[0]);
                    $pointCoord[1] = str_replace(" ","",$location[1]);            
                }
//Передаем координаты заведения и точек по очереди, если хоть 1 точка ближе чем 3 км делаем брейк и идем по условию
$api_response = file_get_contents('https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='.$venue->latitude.','.$venue->longitude.'&destinations='.$pointCoord[0].','.$pointCoord[1].'&key=*********');
                $response = json_decode($api_response);
                $distance = (float) $response->rows[0]->elements[0]->distance->value;
                if($distance<1100){
                    //Проверить нет ли такого соответствия роут-заведение
                    //
                    if(!VenuesRoutes::where([['route_id', $id],['venue_id', $venue->id]])->first())
                        $relationship = VenuesRoutes::create([
                            'route_id' => $id,
                            'venue_id' => $venue->id,
                        ]);
                    break;
                }
            }
        }
    return redirect()->back();
    }
}
