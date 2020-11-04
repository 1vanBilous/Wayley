@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">Menu</div>
                <div class="panel-body" style="background: #f2f2f2;">

                    @foreach($routes as $route)
                      <div class="col-md-6" style="margin-top: 15px;">
                        <div class="card mb-4 box-shadow" style="background: #ffffff;">
                          <a href="/routes/{{$route->id}}">
                          <img class="card-img-top" src="{{$route->picture}}" style="width: 100%; display: block;">
                          </a>
                          <div class="card-body">
                            <p class="card-text" style="text:center">
                              @foreach($route->vocabular as $vocabular)
                                @if($vocabular->language === 'ru')
                                    {{$vocabular->name}}
                                @endif
                              @endforeach
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                              <div class="btn-group">
                                <form method="POST" action="/routes/{{$route->id}}" class="col-xs-12">
                                  {{ csrf_field() }}
                                  {{ method_field('DELETE') }}
                                  <div class="form-group row col-xs-12">
                                    <button class="btn btn-sm btn-outline-secondary">
                                        Delete
                                    </button>
                                  </div>  
                                </form>
                              </div>
                              <small class="text-muted"></small>
                            </div>
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