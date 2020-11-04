<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Input;
use App\Venues;
use App\VenuesRoutes;
use Auth;
use Image;

class PlacesController extends Controller
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
        $venues = Venues::all();
        return view('places.list', compact('venues'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('places.create');
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
        $image = $request->file('picture');
        $filename = time() . '.' . $image->getClientOriginalExtension();
        $path = public_path('/images/venues/' . $filename); 
        }    

        $venue = Venues::create([
            'country' => $request["country"],   
            'city' => $request["city"],
            'nameLat' => $request["nameLat"],
            'nameCyr' => $request["nameCyr"],
            'picture' => $filename, 
            'price' => $request["price"], 
            'category' => $request["category"],
            'tags' => $request["tags"],
            'latitude' => $request["latitude"],
            'longitude' => $request["longitude"], 
            'website' => $request["website"], 
            'phone' => $request["phone"], 
            'author' => Auth::user()->id, 
        ]);

        if(Input::file()){
            Image::make($image->getRealPath())->save($path); 
        }    

        return redirect('/home');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $venue = Venues::where('id', $id)->first();
        return view('places.show', compact('id', 'venue'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $venue = Venues::where('id', $id)->firstOrFail();
        return view('places.edit', compact('venue'));
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
        $filename = Venues::where('id', $id)->firstOrFail()->getOriginal('picture');
        if(Input::file()){
            $image = $request->file('picture');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = public_path('/images/venues/' . $filename); 
        }    

        $venue = Venues::where('id', $id)->firstOrFail()->update([
            'country' => $request["country"],   
            'city' => $request["city"],
            'nameLat' => $request["nameLat"],
            'nameCyr' => $request["nameCyr"],
            'picture' => $filename, 
            'price' => $request["price"], 
            'category' => $request["category"],
            'tags' => $request["tags"],
            'latitude' => $request["latitude"],
            'longitude' => $request["longitude"], 
            'website' => $request["website"], 
            'phone' => $request["phone"], 
            'author' => Auth::user()->id, 
        ]);

        if(Input::file()){
            Image::make($image->getRealPath())->save($path); 
        }    

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = Venues::where('id', $id)->delete();
        $result = VenuesRoutes::where('venue_id', $id)->delete();

        return redirect()->back();
    }

    public function createPoint(Request $request)
    {
        $venue = VenuesRoutes::create([
            'route_id' => $request["route_id"],   
            'venue_id' => $request["venue_id"],
        ]);

        return redirect()->back();
    }

    public function deletePoint($id)
    {
        $result = VenuesRoutes::where('id', $id)->delete();

        return redirect()->back();
    }
}
