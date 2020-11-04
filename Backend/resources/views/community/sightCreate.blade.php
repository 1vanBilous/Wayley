@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">User content</div>
                <div class="panel-body">
                     {!! Form::open(['action'=>'userPlacesController@store', 'files'=>true]) !!}
                

                        <div class="form-group row">
                            <label for="city" class="col-sm-4 col-form-label text-md-right">City</label>
                            <div class="col-md-6">
                                <select id="city" name="city" data-live-search="true" class="form-control{{ $errors->has('city') ? ' is-invalid' : '' }}">
                                <option value="Kharkiv" selected>Kharkiv</option>
                                <option value="Kyiv">Kyiv</option>
                                <option value="Poltava">Poltava</option>
                                <option value="Dnipro">Dnipro</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="phone" class="col-md-4 col-form-label text-md-right">Phone</label>
                            <div class="col-md-6">
                                <input id="phone" type="tel" class="form-control{{ $errors->has('phone') ? ' is-invalid' : '' }}" name="phone">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="website" class="col-md-4 col-form-label text-md-right">Website</label>
                            <div class="col-md-6">
                                <input id="website" type="text" class="form-control{{ $errors->has('website') ? ' is-invalid' : '' }}" name="website">
                            </div>
                        </div>

                        

                        <div class="form-group row">
                            <label for="sightType" class="col-sm-4 col-form-label text-md-right">Type</label>
                            <div class="col-md-6">
                                <select id="sightType" name="sightType" data-live-search="true" class="form-control{{ $errors->has('sightType') ? ' is-invalid' : '' }}">
                                <option value="1" selected>Sight</option>
                                <option value="2">Gov. enterprise</option>
                                <option value="3">Priv. enterprice</option>
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
                            <label for="location" class="col-md-4 col-form-label text-md-right">Location</label>
                            <div class="col-md-6">
                                <input id="location" type="text" class="form-control{{ $errors->has('location') ? ' is-invalid' : '' }}" name="location">
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
<script src="{{ asset('js/sheduleCreate.js') }}"></script>

<script type="text/javascript">
    mapboxgl.accessToken = 'pk.eyJ1IjoidGVybm93eSIsImEiOiJjamR2dWNkZ2cyeTV5Mnhxb3ozcHh2dXJ1In0.xt0czM2gP0hDBmji3mGIcQ';
    var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [36.230383, 49.993500], // starting position [lng, lat]
    zoom: 13 // starting zoom
});

    map.on('click', function (e) {
    $("#location").val(e.lngLat.lat + " ; " + e.lngLat.lng);
    });
</script>
@endsection
