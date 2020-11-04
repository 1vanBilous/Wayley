<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
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
use App\Stat;
use DateTime;

class LandmarksAPI extends Controller
{
    public function getSights($city)
    {
        $result = Sights::where('city', $city)->get();
        foreach ($result as $item) {
          $vocabular = sightsVocabular::where('sights_id', $item->id)->get();
          $shedule = Shedules::where('sights_id', $item->id)->get();
          $photos = Photos::where('sights_id', $item->id)->get();
          $item->vocabular = $vocabular;  
          $item->shedule = $shedule; 
          $item->photos = $photos;   
        }

        return $result->toJson();
    }

    public function getSightsList($city, $language, $places)
    {

        $result = Sights::where([['city', $city],['display', '1']])->paginate($places);

        foreach ($result as $item) {

        $name = sightsVocabular::where([['sights_id', $item->id],['language', $language], ['field', 'name']])->first();
        if($name)$item->name = $name->content;
        else$item->name = '';
        
        $address = sightsVocabular::where([['sights_id', $item->id],['language', $language], ['field', 'address']])->first();
        if($address) $item->address = $address->content;
        else $item->address = '';

        $description = sightsVocabular::where([['sights_id', $item->id],['language', $language], ['field', 'description']])->first();
        if($description) $item->description = $description->content;
        else $item->description = '';  

        $history = sightsVocabular::where([['sights_id', $item->id],['language', $language], ['field', 'history']])->first();
        if($history) $item->history = $history->content;
        else $item->history = '';

        $status = sightsVocabular::where([['sights_id', $item->id],['language', $language], ['field', 'status']])->first();
        if($status) $item->status = $status->content;
        else $item->status = '';

          //$item->shedule = Shedules::where('sights_id', $item->id)->get();
          //$item->photos = Photos::where('sights_id', $item->id)->get();   
        }

        $headers = ['Content-type'=> 'application/json; charset=utf-8'];
        return \Response::json($result,200,$headers,JSON_UNESCAPED_UNICODE);
    }

    public function getSight($id, $language)
    {   
        $item = Sights::where('id', $id)->firstOrFail();
        
        $name = sightsVocabular::where([['sights_id', $item->id],['language', $language], ['field', 'name']])->first();
        if($name) $item->name = $name->content;
        else $item->name = '';
        
        //troubles with language code
        if($language=='ger') $c_language='de'; if($language=='eng') $c_language='en'; 
        if($language=='rus') $c_language='ru'; if($language=='ukr') $c_language='ua';
        
        //set street name accord to language
        $location = explode(";" ,$item->location);
        $location[0] = str_replace(" ","",$location[0]);
        $location[1] = str_replace(" ","",$location[1]);
        $api_response = file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?latlng='.$location[0].','.$location[1].'&key=*****&language='.$c_language);
        $response = json_decode($api_response);
        $response = explode("," ,$response->results[0]->formatted_address);
        $item->address = $response[0].', '.$response[1];
    

        $description = sightsVocabular::where([['sights_id', $item->id],['language', $language], ['field', 'description']])->first();
        if($description) $item->description = $description->content;
        else $item->description = '';  

        $history = sightsVocabular::where([['sights_id', $item->id],['language', $language], ['field', 'history']])->first();
        if($history) $item->history = $history->content;
        else $item->history = '';

        $status = sightsVocabular::where([['sights_id', $item->id],['language', $language], ['field', 'status']])->first();
        if($status) $item->status = $status->content;
        else $item->status = '';

          //$item->shedule = Shedules::where('sights_id', $item->id)->get();
          //$item->photos = Photos::where('sights_id', $item->id)->get();  

        $headers = ['Content-type'=> 'application/json; charset=utf-8'];
        return \Response::json($item,200,$headers,JSON_UNESCAPED_UNICODE);
    }

    public function getSightVocabular($id)
    {
        return sightsVocabular::where('sights_id', $id)->get()->toJson();
    }

    public function getSightVocabularLanguage($id, $language)
    {
        return sightsVocabular::where([['sights_id', $id],['language', $language]])->get()->toJson();
    }

    public function getSightPhotos($id)
    {
        return Photos::where('sights_id', $id)->get()->toJson();
    }

    public function getLandmarksShort($city, $language)
    {
        $sights = Sights::where([['city', $city],['display', '1']])->get();
        foreach ($sights as $item) {

            $name = sightsVocabular::where([['sights_id', $item->id],['language', $language], ['field', 'name']])->first();

            if($name) $item->name = $name->content;
            else $item->name = '';    
            
            $location = explode(";" ,$item->location);
            $location[0] = str_replace(" ","",$location[0]);
            $location[1] = str_replace(" ","",$location[1]);

            $item->location = array('latitude' => $location[0], 'longitude' => $location[1]);
        }
        
        return $sights->toJson();
    }
}
