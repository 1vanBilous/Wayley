@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">Menu</div>
                <div class="panel-body">
                     {{ Form::open([ 'method'  => 'put', 'route' => [ 'places.update', $venue->id ], 'files'=>true ])}}
                        <div class="form-group row"> 
                            <label for="country" class="col-sm-4 col-form-label text-md-right">country</label>
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
                                <option value="Lviv">Lviv</option>
                                <option value="Dnipro">Dnipro</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-5 mb-3"> <label for="firstName">Cyrillic name</label>
                                <input type="text" class="form-control" id="nameCyr" placeholder="" value="{{$venue->nameCyr}}" required="" name="nameCyr">
                            </div>
                            <div class="col-md-2 mb-3">
                                <label for="transletterName"><span class="text-muted">To latin</span></label>
                                <button id="transletterName" class="form-control">Перевод</button>
                            </div>
                            <div class="col-md-5 mb-3"> <label for="lastName">Latin name</label>
                                <input type="text" class="form-control" id="nameLat" placeholder="" value="{{$venue->nameLat}}" required="" name="nameLat">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="picture" class="col-md-4 col-form-label text-md-right">Photo</label> 
                            <div class="col-md-6">
                                <input name="picture" type="file" id="picture"   class="form-control">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="category" class="col-sm-4 col-form-label text-md-right">category</label>
                            <div class="col-md-6">
                                <select id="category" name="category" data-live-search="true" class="form-control">
                                <option value="cafe" selected>cafe</option>
                                <option value="restaurant">restaurant</option>
                                <option value="fastfood">fastfood</option>
                                <option value="drink">drink</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="price" class="col-sm-4 col-form-label text-md-right">price</label>
                            <div class="col-md-6">
                                <select id="price" name="price" data-live-search="true" class="form-control">
                                <option value="1" selected>$</option>
                                <option value="2">$$</option>
                                <option value="3">$$$</option>
                                <option value="4">$$$$</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="tags" class="col-sm-4 col-form-label text-md-right">Tags (Fish, Burger, Meat)</label>
                            <div class="col-md-6">
                                <textarea name="tags" class="form-control">
                                {{$venue->tags}}
                                </textarea>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="phone" class="col-sm-4 col-form-label text-md-right">phone</label>
                            <div class="col-md-6">
                                <input type="text" name="phone" class="form-control" value="{{$venue->phone}}"/>
                            </div>
                        </div>

                        

                        <div class="form-group row">
                            <label for="website" class="col-sm-4 col-form-label text-md-right">website</label>
                            <div class="col-md-6">
                                <input type="text" name="website" class="form-control" value="{{$venue->website}}"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="organisation" class="col-sm-4 col-form-label text-md-right">organisation</label>
                            <div class="col-md-6">
                                <input type="text" name="organisation" class="form-control" value="{{$venue->organisation}}"/>
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <div class="col-md-5 col-md-offset-1">
                                <input type="text" name="latitude" id="latitude" class="form-control" value="{{$venue->latitude}}"/>
                            </div>
                            <div class="col-md-5">
                                <input type="text" name="longitude" id="longitude" class="form-control" value="{{$venue->longitude}}"/>
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <label class="col-md-12">map</label>
                            <div id="map" style="height: 300px;"></div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Update
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
<script src="{{ asset('js/places.js') }}"></script>

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
window.onload = function(){      
setTimeout(executeEdit, 1);   
}
function executeEdit(){
    $("#city option[value='{{$venue->city}}']").prop("selected", true);
    $("#country option[value='{{$venue->country}}']").prop("selected", true);
    $("#category option[value='{{$venue->category}}']").prop("selected", true);
    $("#price option[value='{{$venue->price}}']").prop("selected", true);
}
</script>
@endsection
