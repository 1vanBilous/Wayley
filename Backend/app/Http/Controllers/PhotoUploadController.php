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

class PhotoUploadController extends Controller
{

	public function __construct()
    {
        $this->middleware('auth');
    }

     public function show($id)
    {
        $photos = Photos::where('sights_id', $id)->get();
        return view('landmark.sightPhotos', compact('id', 'photos'));
    }


    public function store(Request $data)
    {
        if(Input::file())
        {
            $image = $data->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = public_path('/images/sights/' . $filename);
            Image::make($image->getRealPath())->save($path);      
        }

            $photo = Photos::create([
            'sights_id' => $data["sights_id"],
            'photo' => $filename,
            ]);

        return redirect()->back();
    }
   
    public function destroy($id)
    {
        $result = Photos::where('id', $id)->delete();

        return redirect()->back();
    }
}
