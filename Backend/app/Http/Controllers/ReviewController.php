<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
use DateTime;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    { 
        $review = Reviews::where('approved', null)->first();
        if($review)
            return view('review.approveOne', compact('review'));
        return redirect('/home');
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
    public function store(Request $request)
    {
        //
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
        $result = Reviews::where('id', $id)->delete();
        return redirect()->back();
    }

    public function approve($id)
    {
        $review = Reviews::where('id', $id)->firstOrFail()->update(array(
            'approved' => '1',
        ));
        return redirect('/review');
    }

    public function decline($id)
    {
        $review = Reviews::where('id', $id)->firstOrFail()->update(array(
            'approved' => '2',
        ));
        return redirect('/review');
    }
}

