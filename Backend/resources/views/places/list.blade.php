@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">Menu</div>
                <div class="panel-body" style="background: #f2f2f2;">

                    @foreach($venues as $venue)
                      <div class="col-md-6" style="margin-top: 15px;">
                        <div class="card mb-4 box-shadow" style="background: #ffffff;">
                          <a href="/places/{{$venue->id}}">
                          <img class="card-img-top" src="{{$venue->picture}}" style="width: 100%; display: block;">
                          </a>
                          <div class="card-body">
                            <p class="card-text" style="text:center">
                                {{$venue->nameLat}}
                            </p>
                          </div> 
                        </div>
                      </div>
                    @endforeach

                     
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('additionalStyles')
<link href="{{ asset('css/sightListtest.css') }}" rel="stylesheet">
@endsection