@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">Menu</div>
                <div class="panel-body">
                     {!! Form::open(['action'=>'EventsController@store', 'files'=>true]) !!}
                
                        <div class="form-group row">
                            <label for="counry" class="col-sm-4 col-form-label text-md-right">Counry</label>
                            <div class="col-md-6">
                                <select id="country" name="country" data-live-search="true" class="form-control">
                                <option value="ua" selected>Ukraine</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="city" class="col-sm-4 col-form-label text-md-right">City</label>
                            <div class="col-md-6">
                                <select id="city" name="city" data-live-search="true" class="form-control">
                                <option value="Kharkiv" selected>Kharkiv</option>
                                <option value="Kyiv">Kyiv</option>
                                <option value="Poltava">Poltava</option>
                                <option value="Dnipro">Dnipro</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="language" class="col-sm-4 col-form-label text-md-right">Language</label>
                            <div class="col-md-6">
                                <select id="language" name="language" data-live-search="true" class="form-control">
                                <option value="en" selected>English</option>
                                <option value="ua">Ukrainian</option>
                                <option value="ru">Russian</option>
                                <option value="de">German</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="name" class="col-sm-4 col-form-label text-md-right">Name</label>
                            <div class="col-md-6">
                                <input type="text" name="name" id="name" class="form-control"/> 
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="description" class="col-sm-4 col-form-label text-md-right">Description</label>
                            <div class="col-md-6">
                                <TEXTAREA class="form-control" id="description" name="description"> </TEXTAREA>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="category" class="col-sm-4 col-form-label text-md-right">Category</label>
                            <div class="col-md-6">
                                <select id="category" name="category" data-live-search="true" class="form-control">
                                <option value="walk" selected>Walk</option>
                                <option value="conference">Conference</option>
                                <option value="extreme">Extreme</option>
                                <option value="tour">Tour</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="photo" class="col-md-4 col-form-label text-md-right">Photo</label>
                            <div class="col-md-6">
                                 {!! Form::file('image', array('class' => 'form-control', 'required' =>'required')) !!}
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="address" class="col-sm-4 col-form-label text-md-right">Address</label>
                            <div class="col-md-6">
                                <input type="text" name="address" id="address" class="form-control"/> 
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="places" class="col-sm-4 col-form-label text-md-right">Places</label>
                            <div class="col-md-6">
                                <input type="number" step="1" name="places" id="places" class="form-control"/> 
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <label for="tickets" class="col-sm-4 col-form-label text-md-right">Tickets * link</label>
                            <div class="col-md-6">
                                <input type="text" name="tickets" id="tickets" class="form-control"/> 
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <label for="info" class="col-sm-4 col-form-label text-md-right">Info * link</label>
                            <div class="col-md-6">
                                <input type="text" name="info" id="info" class="form-control"/> 
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="date" class="col-sm-4 col-form-label text-md-right">date & time</label>
                            <div class="col-md-3">
                                <input type="date" name="date" id="date" class="form-control"/> 
                                
                            </div>
                            <div class="col-md-3">
                               
                                <input type="time" name="time" id="time" class="form-control"/> 
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="organisation" class="col-sm-4 col-form-label text-md-right">organisation * link</label>
                            <div class="col-md-6">
                                <input type="text" name="organisation" id="organisation" class="form-control"/> 
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="longitude" class="col-md-4 col-form-label text-md-right">Location</label>
                            <div class="col-md-3">                        
                                <input id="latitude" type="text" class="form-control" name="latitude">
                            </div>
                            <div class="col-md-3">  
                            <input id="longitude" type="text" class="form-control" name="longitude">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-12">map</label>                                
                            <div id="map" style="height: 300px;"></div>  
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Create
                                </button>
                            </div>
                        </div>
                    {!! Form::close() !!}
                   
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section('additionalScripts')
<script type="text/javascript">
    mapboxgl.accessToken = 'pk.eyJ1IjoidGVybm93eSIsImEiOiJjamR2dWNkZ2cyeTV5Mnhxb3ozcHh2dXJ1In0.xt0czM2gP0hDBmji3mGIcQ';
    var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [36.230383, 49.993500], // starting position [lng, lat]
    zoom: 12 // starting zoom
});

    map.on('click', function (e) {
    $("#latitude").val(e.lngLat.lat);
    $("#longitude").val(e.lngLat.lng);
    });
</script>
@endsection
