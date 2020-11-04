<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/assembleVenues/{id}', 'PointsController@assembleVenues');

Route::get('/', 'SightsController@index');

Route::get('/agreement', function () {
    return view('landing.agreement');
});

Route::get('/home', 'SightsController@index')->name('home');
Route::get('/shedule/{id}', 'SheduleController@index');

Route::get('/statistics', 'StatisticController@index');
Route::get('/statistics/{user}', 'StatisticController@user');

Route::get('/SightV/getData/{id}', 'SightVocabularController@getData');

Route::get('/phrasesListVocabular/{id}', function () {
    return view('phrasesListVocabular')->with('vocabulars', 
    	  sightsVocabular::where('sights_id', $id)
        ->orderBy('sights_id', 'desc')
        ->get());
});
Route::resource('/photo', 'PhotoUploadController');/////////
Route::resource('/user', 'UserPageController');
Route::resource('community', 'userPlacesController');
Route::resource('sights', 'SightsController');
Route::resource('places', 'PlacesController');
Route::resource('/SightV', 'SightVocabularController');
Route::resource('/routes', 'RoutesController');
Route::resource('/events', 'EventsController');
Route::resource('/points', 'PointsController');
Route::resource('/review', 'ReviewController');
Route::resource('/discounts', 'discountsCRUD');
Route::resource('/routesVocabular', 'RoutesVocabularController');

Route::resource('/mappoints', 'MapPointsController');

Auth::routes();

Route::get('/review/{id}/approve', 'ReviewController@approve');
Route::get('/review/{id}/decline', 'ReviewController@decline');

//API
Route::group(['prefix' => 'api'], function() {
	Route::get('/sights/{city}/{language}/{places}','LandmarksAPI@getSightsList'); //all sights
	Route::get('/sight/{id}/{language}','LandmarksAPI@getSight'); // get all info of one place
	Route::get('/sight-photo/{id}','LandmarksAPI@getSightPhotos'); // all photos of one place
	Route::get('/sights/{city}','LandmarksAPI@getSights'); // WITH much to parse
	Route::get('/sight/vocabular/{id}','LandmarksAPI@getSightVocabular'); //vocabular of one place
	Route::get('/sight/vocabular/{id}/{language}','LandmarksAPI@getSightVocabularLanguage'); // vocabular of one place for current language
	Route::get('/landmarks/{city}/{language}','LandmarksAPI@getLandmarksShort');

	Route::get('/','APIController@index'); //all info 

	Route::get('/getDiscount/{userLocation}/{venue_id}/{uid}','discountAPI@createDiscount'); //all info 
	
	Route::get('/routes/{city}/{language}','RoutesAPI@getRoutes');
	Route::get('/route/{id}/{language}','RoutesAPI@getRoute');

	Route::post('/venue/review','ReviewsAPI@createReview');
	Route::get('/venue/review/{venue_id}/{user_uid}','ReviewsAPI@getUserReview');
	Route::get('/venue/reviews/{venue_id}','ReviewsAPI@getVenueReviews');
	Route::get('/venues/{route_id}/{city}/{language}','VenuesAPI@getRouteVenues');
	Route::get('/venues/{city}/{language}','VenuesAPI@getPlacesShort');
	Route::get('/venue/{id}/{language}','VenuesAPI@getPlace');
	Route::get('/venues_list/{city}/{language}/{count}','VenuesAPI@getPlacesList');
	Route::get('/venues_listt/{city}/{language}/{count}','VenuesAPI@getPlacesList2');

	Route::get('/stat/{user_uid}/{page}/{route_id}','StatisticsAPI@statsGetVisit');

	Route::get('/test','APIController@test');
});