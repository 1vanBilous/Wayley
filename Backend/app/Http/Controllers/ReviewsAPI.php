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

class ReviewsAPI extends Controller 
{
    public function createReview(Request $request)
    {
        //check if user havent sent the review for this venue
        $review = Reviews::create([
                    'venue_id' => $request["venue_id"],
                    'user_uid' => $request["user_uid"],
                    'review_text' => $request["review_text"],
                    'rating' => $request["rating"],
                    'user_email' => $request["user_email"],
        ]);
            
        return $review->toJson();
    }

    public function getUserReview($venue_id, $user_uid){
        $review = Reviews::where([ ['venue_id', $venue_id], ['user_uid', $user_uid] ])->first();
            if($review)
                $result = array('reviewed' => 'yes');
            else
                $result = array('reviewed' => null);
        return json_encode($result);
    }

    public function getVenueReviews($venue_id){
        $reviews = Reviews::where([['venue_id', $venue_id],['approved', '1']])->paginate(3);
        foreach ($reviews as $review){
            $review->user_uid = 'secret';
            $dt = new DateTime($review->created_at);
            $review->dateOfReview = $dt->format('d/m/Y');


        }
        
        return $reviews->toJson();
    }

}
