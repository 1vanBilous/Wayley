<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Discounts;
use App\Venues;

class discountsCRUD extends Controller
{
    public function index()
    {
        $discounts = Discounts::all();

        foreach($discounts as $discount)
            $discount->venue_name = Venues::where('id', $discount->venue_id)->first()->nameLat;

        return view('discount.list', compact('discounts'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $venues = Venues::where('deleted', null)->get();
        return view('discount.create', compact('venues'));
    }

    public function store(Request $request)
    {
        $discount = Discounts::create([
            'venue_id' => $request["venue"],
            'discount' => $request["discount"],
            'active' => $request["active"],
            'countPerWeek' => $request["countPerWeek"],
        ]);

        return redirect('/discounts');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $discount = Discounts::where('id', $id)->first();
        $discount->venue_name = Venues::where('id', $discount->venue_id)->first()->nameLat;
        
        return view('discount.show', compact('discount'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $discount = Discounts::where('id', $id)->first();
        $venue = Venues::where('id', $discount->venue_id)->first();
        return view('discount.edit', compact('discount', 'venue', 'id'));
    }

    public function update(Request $request, $id)
    {
        $discount = Discounts::where('id', $id)->firstOrFail()->update([
            'discount' => $request["discount"],
            'active' => $request["active"],
            'countPerWeek' => $request["countPerWeek"],
        ]);

        return redirect('/discounts');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $discount = Discounts::where('id', $id)->delete();
        return redirect('/discounts');
    }
}
