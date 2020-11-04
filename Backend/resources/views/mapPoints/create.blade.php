@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">Menu</div>
                <div class="panel-body">
                     {!! Form::open(['action'=>'MapPointsController@store', 'files'=>true]) !!}
                
                        <input type="hidden" value="Ukraine" name="country" />

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
                            <label for="sightType" class="col-sm-4 col-form-label text-md-right">Type</label>
                            <div class="col-md-6">
                                <select id="sightType" name="sightType" data-live-search="true" class="form-control">
                                    <option value="toilet" selected>Toilet</option>
                                    <option value="venue">Venue</option>
                                    <option value="landmark">Landmark</option>
                                </select>
                            </div>
                        </div>

                        <input id="latitude" type="hidden" class="form-control" name="latitude">
                        <input id="longitude" type="hidden" class="form-control" name="longitude">

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
<script src="{{ asset('js/sheduleTimestamps.js') }}"></script>

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
    
    if(marker)
    marker.remove();

    var marker = new mapboxgl.Marker()
        .setLngLat([e.lngLat.lng,e.lngLat.lat])
        .addTo(map);
});
</script>
@endsection
