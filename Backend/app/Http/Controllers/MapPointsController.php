<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MapPoints;
use App\MapPointsFields;


class MapPointsController extends Controller
{
    public function index()
    {
        $points = MapPoints::all();
        foreach ($points as $point) {
          
        } 
        return view('mapPoints.list', compact('points'));
    }

    public function create()
    {
        return view('mapPoints.create');
    }

    public function store(Request $request)
    {
        $point = MapPoints::create([
            'country' => $request["country"],
            'city' => $request["city"],
            'type' => $request["type"],
            'latitude' => $request["latitude"],
            'longitude' => $request["longitude"],
        ]);

        return redirect('/mappoints/'.$point->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }
}
