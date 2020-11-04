@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">Menu</div>
                <div class="panel-body">
                    
                     
               {{ Form::open([ 'method'  => 'put', 'route' => [ 'routes.update', $route->id ], 'files'=>true ])}}

                        <div class="form-group row">
                            <label for="country" class="col-sm-4 col-form-label text-md-right">Counry</label>
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
                            <label for="amount" class="col-sm-4 col-form-label text-md-right">Amount</label>
                            <div class="col-md-6">
                                <input type="number" step="0.1" name="amount" id="amount" class="form-control" value="{{$route->amount}}"/> 
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="duration" class="col-sm-4 col-form-label text-md-right">Duration</label>
                            <div class="col-md-6">
                                <input type="number" step="0.1" name="duration" id="duration" class="form-control" value="{{$route->duration}}"/> 
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="distance" class="col-sm-4 col-form-label text-md-right">Distance</label>
                            <div class="col-md-6">
                                <input type="number" step="0.1" name="distance" id="distance" class="form-control" value="{{$route->distance}}"/> 
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="photo" class="col-md-4 col-form-label text-md-right">Photo</label>
                            <div class="col-md-6">
                                 {!! Form::file('image', array('class' => 'form-control')) !!}
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="nameEn" class="col-sm-4 col-form-label text-md-right">nameEn</label>
                            <div class="col-md-6">
                                <input type="text" name="nameEn" id="nameEn" class="form-control" value="{{$nameEn}}"/> 
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="nameDe" class="col-sm-4 col-form-label text-md-right">nameDe</label>
                            <div class="col-md-6">
                                <input type="text" name="nameDe" id="nameDe" class="form-control" value="{{$nameDe}}"/> 
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="nameUa" class="col-sm-4 col-form-label text-md-right">nameUa</label>
                            <div class="col-md-6">
                                <input type="text" name="nameUa" id="nameUa" class="form-control" value="{{$nameUa}}"/> 
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="nameRu" class="col-sm-4 col-form-label text-md-right">nameRu</label>
                            <div class="col-md-6">
                                <input type="text" name="nameRu" id="nameRu" class="form-control" value="{{$nameRu}}"/> 
                            </div>
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
<script type="text/javascript">
//Ждем загрузку всех скриптов
    window.onload = function(){      
        setTimeout(executeEdit, 1);   
    }
    function executeEdit(){
        $("#country option[value='{{$route->country}}']").prop("selected", true);
        $("#city option[value='{{$route->city}}']").prop("selected", true);
    }
</script>
@endsection
