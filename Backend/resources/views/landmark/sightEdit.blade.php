@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">Menu</div>
                <div class="panel-body">
                    
                     
               {{ Form::open([ 'method'  => 'put', 'route' => [ 'sights.update', $sight->id ], 'files'=>true ])}}

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
                            <label for="price" class="col-sm-4 col-form-label text-md-right">Price</label>
                            <div class="col-md-4">
                                <input id="price" type="number" step="any" class="form-control" name="price" value="{{$sight->price}}">
                            </div>

                            <div class="col-md-2">
                                <select id="valute" name="valute" data-live-search="true" class="form-control">
                                <option value="uah" selected>UAH</option>
                                <option value="usd">USD</option>
                                <option value="eur">EUR</option>
                                <option value="rur">RUR</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="phone" class="col-md-4 col-form-label text-md-right">Phone</label>
                            <div class="col-md-6">
                                <input id="phone" type="tel" class="form-control" name="phone" value="{{$sight->phone}}">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="website" class="col-md-4 col-form-label text-md-right">Website</label>
                            <div class="col-md-6">
                                <input id="website" type="text" class="form-control" name="website" value="{{$sight->website}}">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="display" class="col-sm-4 col-form-label text-md-right">On sights list</label>
                            <div class="col-md-6">
                                <select id="display" name="display" data-live-search="true" class="form-control">
                                <option value="1" >Display</option>
                                <option value="2">Hide</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="sightType" class="col-sm-4 col-form-label text-md-right">Type</label>
                            <div class="col-md-6">
                                <select id="sightType" name="sightType" data-live-search="true" class="form-control">
                                <option value="1" >Architecture</option>
                                <option value="2">Nature</option>
                                <option value="3">Culture</option>
                                <option value="4">Entertainment</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="photo" class="col-md-4 col-form-label text-md-right">Photo</label>
                            <div class="col-md-6">
                                 {!! Form::file('image', array('class' => 'form-control')) !!}
                            </div>
                        </div>


                        <div class="form-group row">
                             <label for="fullWeek" class="col-md-4 col-form-label text-md-right">Shedule</label>
                             <div class="col-md-6">
                                <div class="material-switch">
                                <input id="fullWeek" name="fullWeek" type="checkbox" />
                                <label for="fullWeek" class="label-success"></label>
                                </div>
                            </div>
                        </div>

                         <div id="timeblock">


                        <div class="form-group row">
                             <label class="col-md-4 col-form-label text-md-right">
                                
                             </label>
                             <div class="col-md-3">
                                <input id="toset_o" type="time" class="form-control" name="toset_o">
                            </div>
                            <div class="col-md-3">
                                <input id="toset_c" type="time" class="form-control" name="toset_c">
                            </div> 
                        </div>   

                        <div class="form-group row">
                             <label class="col-md-4 col-form-label text-md-right">
                                
                             </label>
                             <div class="col-md-2">
                                <button id="setTimers" class="btn btn-primary">
                                    Week
                                </button>
                            </div>
                            <div class="col-md-2">
                                <button id="setWeekendsTimers" class="btn btn-primary">
                                    Weekends
                                </button>
                            </div>
                            <div class="col-md-2">
                                <button id="setWeekdaysTimers" class="btn btn-primary">
                                   	Weekdays
                                </button>
                            </div>
                            
                        </div>      

                        <div class="form-group row">
                            <label for="Monday" class="col-md-4 col-form-label text-md-right">Monday</label>
                            <div class="col-md-3">
                                <input id="mon_o" type="time" class="form-control" name="mon_o" value="{{$shedule->mon_o}}">
                            </div>
                            <div class="col-md-3">
                                <input id="mon_c" type="time" class="form-control" name="mon_c" value="{{$shedule->mon_c}}">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="Tuesday" class="col-md-4 col-form-label text-md-right">Tuesday</label>
                            <div class="col-md-3">
                                <input id="tue_o" type="time" class="form-control" name="tue_o" value="{{$shedule->tue_o}}">
                            </div>
                            <div class="col-md-3">
                                <input id="tue_c" type="time" class="form-control" name="tue_c" value="{{$shedule->tue_c}}">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="Wednesday" class="col-md-4 col-form-label text-md-right">Wednesday</label>
                            <div class="col-md-3">
                                <input id="wed_o" type="time" class="form-control" name="wed_o" value="{{$shedule->wed_o}}">
                            </div>
                            <div class="col-md-3">
                                <input id="wed_c" type="time" class="form-control" name="wed_c" value="{{$shedule->wed_c}}">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="Thursday" class="col-md-4 col-form-label text-md-right">Thursday</label>
                            <div class="col-md-3">
                                <input id="thu_o" type="time" class="form-control" name="thu_o" value="{{$shedule->thu_o}}">
                            </div>
                            <div class="col-md-3">
                                <input id="thu_c" type="time" class="form-control" name="thu_c" value="{{$shedule->thu_c}}">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="Friday" class="col-md-4 col-form-label text-md-right">Friday</label>
                            <div class="col-md-3">
                                <input id="fri_o" type="time" class="form-control" name="fri_o" value="{{$shedule->fri_o}}">
                            </div>
                            <div class="col-md-3">
                                <input id="fri_c" type="time" class="form-control" name="fri_c" value="{{$shedule->fri_c}}">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="Saturday" class="col-md-4 col-form-label text-md-right">Saturday</label>
                            <div class="col-md-3">
                                <input id="sat_o" type="time" class="form-control" name="sat_o" value="{{$shedule->sat_o}}">
                            </div>
                            <div class="col-md-3">
                                <input id="sat_c" type="time" class="form-control" name="sat_c" value="{{$shedule->sat_c}}">
                            </div>
                        </div>
                        <div class="form-group row">
                             <label for="Sunday" class="col-md-4 col-form-label text-md-right">Sunday</label>
                            <div class="col-md-3">
                                <input id="sun_o" type="time" class="form-control" name="sun_o" value="{{$shedule->sun_o}}">
                            </div>
                            <div class="col-md-3">
                                <input id="sun_c" type="time" class="form-control" name="sun_c" value="{{$shedule->sun_c}}">
                            </div>
                        </div>

                    </div>
                        <div class="form-group row">
                            <label for="location" class="col-md-4 col-form-label text-md-right">Location</label>
                            <div class="col-md-6">
                                <input id="location" type="text" class="form-control{{ $errors->has('location') ? ' is-invalid' : '' }}" name="location" value="{{$sight->location}}">
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
<script src="{{ asset('js/sheduleEdit.js') }}"></script>
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
    $("#location").val(e.lngLat.lat + " ; " + e.lngLat.lng);
    });
</script>
<script type="text/javascript">
//Ждем загрузку всех скриптов
    window.onload = function(){      
    setTimeout(executeEdit, 1);   
    }
    function executeEdit(){

        

        $("#city option[value='{{$sight->city}}']").prop("selected", true);
        $("#valute option[value='{{$sight->valute}}']").prop("selected", true);
        $("#sightType option[value='{{$sight->type}}']").prop("selected", true);
        $("#display option[value='{{$sight->display}}']").prop("selected", true);
    
        if({{$shedule->fullWeek}}==1){
            $("#fullWeek").prop("checked", true);
            $('input[type="time"]').attr("disabled", true);
            $('#timeblock').hide("slow"); 
        }
    }
</script>
@endsection
