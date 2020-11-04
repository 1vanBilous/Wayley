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

class RoutesAPI extends Controller
{
    public function getRoutes($city, $language)
    {
        $route = Routes::where('city', $city)->orderBy('id', 'desc')->paginate(3);
        foreach ($route as $item) {
        $name = RouteNames::where([['route_id', $item->id],['language', $language],])->first();
        $item->name = $name->name;
    	}
        return $route->toJson();
    }

    public function getRoute($id, $language)
    {
        $points = Points::where('route_id', $id)->orderBy('order', 'asc')->get();
        $result = [];
       	foreach ($points as $item) {
       		if($item->venue_id!='0'){
	       		$sight = Sights::where('id', $item->venue_id)->first();

	       		if($language=='ru') $language='rus'; 
	       		if($language=='en') $language='eng'; 
	       		if($language=='de') $language='ger'; 
	       		if($language=='ua') $language='ukr'; 

                $name = sightsVocabular::where([['sights_id', $item->venue_id],['language', $language], ['field', 'name']])->first();
                $status = sightsVocabular::where([['sights_id', $item->venue_id],['language', $language], ['field', 'status']])->first();	    	    
                if($status) $status = $status->content;
                else $status = null;
                $coordinates = explode(";", $sight->location);  
				
				$coordinates = array('latitude' => $coordinates[0], 'longitude' => $coordinates[1]);

	        	$place = array(
	        		'order' => $item->order,
	        		'title' => $name->content,
	        		'illustration' => $sight->photo,
	        		'id' => $item->venue_id,
	        		'subtitle' => $sight->price,
                    'coordinates' => $coordinates,
                    'status' => $status,
				);	
				array_push($result, $place);
	        }else{	   
	        	$coordinates = array('latitude' => $item->latitude, 'longitude' => $item->longitude);

	        	$point = array(
	        		'order' => $item->order,
	        		'title' => null,
	        		'id' => 0,
				    'coordinates' => $coordinates,				
				);
				array_push($result, $point);
	        }
       	}
        return json_encode($result);
    }
}
