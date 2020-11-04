<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Discounts;
use App\Venues;
use App\discountsGenerated;
use Carbon\Carbon;

class discountAPI extends Controller
{
    public function createDiscount($userLocation, $venue_id, $uid){
        $lang = 'en';
        $key = '******';
        
        $userLocation = preg_replace('/\s+/', '', $userLocation);
        $venue = Venues::where('id', $venue_id)->first();
        $discountData = Discounts::where('venue_id', $venue_id)->first();
        if(!$discountData) return json_encode(array('api_response' => 'ERROR','api_message'=>'WRONG VENUE'));
        if(!$venue) return json_encode(array('api_response' => 'ERROR','api_message'=>'WRONG VENUE'));

        //Считаем сколько попыток юзер сделал // 
            // TODO Добавить проверку за неделю, сделать Where between dates // Carbon
        Carbon::setWeekStartsAt(Carbon::SUNDAY);
        $discountNumber = discountsGenerated::where('user', $uid)
            ->where('venue_id', $venue_id)
            ->whereBetween('created_at', [Carbon::now()->startOfWeek(),Carbon::now()->endOfWeek()])
            ->count();
        if($discountNumber > $discountData->countPerWeek)
            return json_encode(array(
                'api_response' => 'TO_MUCH',
                'api_message'=>'All discounts are used',
                'count_try' => $discountData->countPerWeek - $discountNumber,
            ));
        
        //End

        //Передаем координаты заведения и пользователя
        $api_response = file_get_contents('https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='.$userLocation.'&destinations='.$venue->latitude.','.$venue->longitude.'&key='.$key);
        $response = json_decode($api_response);

        if($response->rows[0]->elements[0]->status != 'OK')
            return json_encode(array(
                'api_response' => 'ERROR', 'api_message' => 'WRONG COORDINATES'
                ));

        $distance = (float)$response->rows[0]->elements[0]->distance->value;
        
        if($distance<50){

            $discount = discountsGenerated::create([
                "venue_id" => $venue_id,
                "key" => bcrypt(uniqid($uid, true)),
                "user" => $uid,
            ]);

            return json_encode(array(
                "api_response" => 'OK',
                "venue_id" => $venue_id,
                "key" => $discount->key,
                "api_message" => $distance,
                "discount" => $discountData->discount,
                'count_try' => $discountData->countPerWeek - $discountNumber,
            ));
        }
        else{
            return json_encode(array(
                "api_response" => 'TO_FAR',
                "api_message" => $distance,
                ));
        }
    }
}
