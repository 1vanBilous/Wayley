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

class RoutesController extends Controller
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
        $routes = Routes::all();
        foreach ($routes as $item) {
          $vocabular = RouteNames::where('route_id', $item->id)->get();
          $item->vocabular = $vocabular;  
        } 
        return view('routes.routes', compact('routes'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('routes.createRoute');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $filename = ''; 
        if(Input::file()){
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = public_path('/images/routes/' . $filename);
        }    

        $route = Routes::create([
            'amount' => $request["amount"],
            'duration' => $request["duration"],
            'distance' => $request["distance"],
            'city' => $request["city"],
            'country' => $request["country"],
            'picture' => $filename,
        ]);

        $vocabular = RouteNames::create([
            'route_id' => $route->id,
            'language' => 'ru',
            'name' => $request['nameRu'], 
        ]);

        $vocabular = RouteNames::create([
            'route_id' => $route->id,
            'language' => 'en',
            'name' => $request['nameEn'], 
        ]);

        $vocabular = RouteNames::create([
            'route_id' => $route->id,
            'language' => 'de',
            'name' => $request['nameDe'], 
        ]);

        $vocabular = RouteNames::create([
            'route_id' => $route->id,
            'language' => 'ua',
            'name' => $request['nameUa'], 
        ]);

        if(Input::file()){
            Image::make($image->getRealPath())->save($path); 
        }    

        return redirect('routes/'.$route->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = Sights::where('city', 'Kharkiv')->get();
        foreach ($result as $item) {
        $name = sightsVocabular::where([['sights_id', $item->id],['language', 'rus'], ['field', 'name']])->first();
        if($name) $item->name = $name->content;
        else $item->name = '';
        }

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
            
        return view('routes.points', compact('id', 'result', 'points'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $route = Routes::where('id', $id)->firstOrFail();
            $nameEn = RouteNames::where(['route_id' => $id, 'language' => 'en', ])->firstOrFail()->name;
            $nameDe = RouteNames::where(['route_id' => $id, 'language' => 'de', ])->firstOrFail()->name;
            $nameUa = RouteNames::where(['route_id' => $id, 'language' => 'ua', ])->firstOrFail()->name;
            $nameRu = RouteNames::where(['route_id' => $id, 'language' => 'ru', ])->firstOrFail()->name;
        return view('routes.edit', compact('route','nameEn','nameUa','nameRu','nameDe'));
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
        $filename = Routes::where('id', $id)->firstOrFail()->getOriginal('picture');
            
        if(Input::file()){
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = public_path('/images/routes/' . $filename);
        }    

        $route = Routes::where('id', $id)->firstOrFail()->update([
            'amount' => $request["amount"],
            'duration' => $request["duration"],
            'distance' => $request["distance"],
            'city' => $request["city"],
            'country' => $request["country"],
            'picture' => $filename,
        ]);

        $vocabular = RouteNames::where(['route_id' => $id, 'language' => 'ru', ])->firstOrFail()->update([
            'name' => $request['nameRu'], 
        ]);

        $vocabular = RouteNames::where(['route_id' => $id, 'language' => 'en', ])->firstOrFail()->update([
            'name' => $request['nameEn'], 
        ]);

        $vocabular = RouteNames::where(['route_id' => $id, 'language' => 'de', ])->firstOrFail()->update([
            'name' => $request['nameDe'], 
        ]);

        $vocabular = RouteNames::where(['route_id' => $id, 'language' => 'ua', ])->firstOrFail()->update([
            'name' => $request['nameUa'], 
        ]);

        if(Input::file()){
            Image::make($image->getRealPath())->save($path); 
        }    

        return redirect('/routes/'.$id.'/edit');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = Routes::where('id', $id)->delete();
        $result = RouteNames::where('route_id', $id)->delete();
        $result = Points::where('route_id', $id)->delete();

        return redirect('/routes');
    }
}
