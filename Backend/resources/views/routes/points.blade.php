@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">Menu</div>
                <div class="panel-body">
                     
{!! Form::open(['action' => 'PointsController@store']) !!}
<div class="form-group row">     
    <div class="col-md-4">
        <select id="venue_id" name="venue_id" data-live-search="true" class="form-control">
            <option value="0">It is not a place</option>
            @foreach($result as $item)
                <option value="{{$item->id}}">{{$item->name}}</option>
            @endforeach
        </select>
    </div>

    <div class="col-md-2">
        <input type="number" step="1" name="order" id="order" class="form-control"/>
    </div>

    <div class="col-md-3">
        <input type="number" name="latitude" id="latitude" class="form-control"/>
    </div>
    <div class="col-md-3">
        <input type="number" name="longitude" id="longitude" class="form-control"/>
    </div>
    
    <input type="hidden" name="route_id" id="route_id" value="{{$id}}">

</div>
<div class="col-md-2 col-md-offset-10 ">
        <button type="submit" class=" form-control btn btn-primary" id="addPointToRoute">
            Add
        </button>
    </div>
{!! Form::close() !!}
                <div class="pointsList">
                        @include('routes.pointsList')
                </div>
        <div class="col-xs-12"> 
            <a class=" form-control btn btn-primary" href="/assembleVenues/{{$id}}">
                Analyze venues
            </a>
        </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section('additionalScripts')
<script src="{{ asset('js/ajax/routesPoints.js') }}"></script>
@endsection