@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">Edit discount</div>
                <div class="panel-body">
                     {!! Form::open(['method'  => 'put', 'route' => [ 'discounts.update', $id ] ]) !!}
                
                        <div class="form-group row">
                            <label for="venue" class="col-sm-4 col-form-label text-md-right">Venue</label>
                            <div class="col-md-6">
                                <select id="venue" name="venue" data-live-search="true" class="form-control" disabled>
                                        <option value="{{$venue->id}}">{{$venue->nameLat}}</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="discount" class="col-md-4 col-form-label text-md-right">Discount test</label>
                            <div class="col-md-6">
                                <input id="discount" type="tel" class="form-control" name="discount" value="{{$discount->discount}}">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="active" class="col-sm-4 col-form-label text-md-right">Active</label>
                            <div class="col-md-6">
                                <select id="active" name="active" data-live-search="true" class="form-control" required>
                                    <option value="1">Active</option>
                                    <option value="0">Not active</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="countPerWeek" class="col-sm-4 col-form-label text-md-right">Per week (4 default)</label>
                            <div class="col-md-6">
                                <input type="number" id="countPerWeek" name="countPerWeek" class="form-control" value="{{$discount->countPerWeek}}" />
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
        $("#active option[value='{{$discount->active}}']").prop("selected", true);
    }
</script>
@endsection
