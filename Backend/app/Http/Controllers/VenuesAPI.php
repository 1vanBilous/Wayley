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
use App\Discounts;

class VenuesAPI extends Controller
{
    public function getPlacesShort($city, $language)
    {
        $result = [];
        $venues = Venues::where([['city', $city], ['deleted', null]])->get();

        foreach ($venues as $venue) {
                if($language == 'en' || $language == 'de')
                    $name = $venue->nameLat;
                if($language == 'ua' || $language == 'ru')
                    $name = $venue->nameCyr;
                
                $discount = Discounts::where('venue_id', $venue->id)->exists();

                $price = '';
                for($i=0; $i<$venue->price; $i++)
                    $price = $price.'$';

                $venue = array(
                    'id' => $venue->id,
                    'coordinates' => array('latitude' => $venue->latitude, 'longitude' => $venue->longitude),
                    'name' => $name,
                    'price' => $price,
                    'discount' => $discount,
                );	
                array_push($result, $venue);
        }

        return json_encode($result);
    }

    

    // END

    public function getPlace($id, $language)
    {
        $venue = Venues::where('id', $id)->firstOrFail();
        $discountExists = Discounts::where('venue_id', $id)->exists();
            if($language == 'en' || $language == 'de')
                $venue->nameLat = $venue->nameLat;
            if($language == 'ua' || $language == 'ru')
                $venue->nameLat = $venue->nameCyr;

        $api_response = file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?latlng='.$venue->latitude.','.$venue->longitude.'&key=*******&language='.$language);
        $response = json_decode($api_response);
        $response = explode("," ,$response->results[0]->formatted_address);
        $venue->address = $response[0].', '.$response[1].', '.$response[2];
        $discountExists = Discounts::where('venue_id', $id)->exists();
        $venue->discount = $discountExists;
        $venue->superTags = $venue->tags;
        if($discountExists) $venue->discountMessage = Discounts::where('venue_id', $id)->first()->discount;

        return $venue->toJson();
    }

    public function getPlacesList($city, $language, $count)
    {
        $venues = Venues::where([['city', $city], ['deleted', null]])
        ->paginate($count);
        foreach ($venues as $venue) {
            if($language == 'en' || $language == 'de')
                $venue->name = $venue->nameLat;
            if($language == 'ua' || $language == 'ru')
                $venue->name = $venue->nameCyr;
        
            $venue->discount = Discounts::where('venue_id', $venue->id)->exists();

            $price = '';
            for($i=0; $i<$venue->price; $i++)
                $price = $price.'$';
            $venue->price = $price;
        }

        return $venues->toJson();
    }

    public function getPlacesList2($city, $language, $count)
    {
        $venues = Venues::where([['city', $city], ['deleted', null]])
        ->paginate($count);
        foreach ($venues as $venue) {
            if($language == 'en' || $language == 'de')$venue->name = $venue->nameLat;
            if($language == 'ua' || $language == 'ru')$venue->name = $venue->nameCyr;
        
            $venue->discount = Discounts::where('venue_id', $venue->id)->exists();

            $price = '';
            for($i=0; $i<$venue->price; $i++)
                $price = $price.'$';
            $venue->price = $price;
        }

        $result = $venues;

        return $result->sortBy('discount')->toJson();
    }

    public function getRouteVenues($route_id, $city, $language)
    {
        $result = [];
        $relationships = VenuesRoutes::where('route_id', $route_id)->get();

        foreach ($relationships as $relationship) {
            $venue = Venues::where([['id', $relationship->venue_id], ['deleted', null]])->first();
            if(!$venue)continue;
                
                if($language == 'en' || $language == 'de')
                    $name = $venue->nameLat;
                if($language == 'ua' || $language == 'ru')
                    $name = $venue->nameCyr;

                $price = '';
                for($i=0; $i<$venue->price; $i++)
                    $price = $price.'$';

                $discount = Discounts::where('venue_id', $venue->id)->exists();
                
                $venue = array(
                    'id' => $venue->id,
                    'coordinates' => array('latitude' => $venue->latitude, 'longitude' => $venue->longitude),
                    'name' => $name,
                    'price' => $price,
                    'discount' => $discount,
                );	
                array_push($result, $venue);
        }
        
        return json_encode($result);
    }
}
