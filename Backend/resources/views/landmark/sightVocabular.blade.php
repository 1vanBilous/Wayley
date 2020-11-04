@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">Menu</div>
                <div class="panel-body">
                     
                    {!! Form::open(['url' => '/SightV', 'method' => 'POST']) !!}
                        <div class="form-group row">     
                            <div class="col-md-2">
                                <select id="field" name="field" data-live-search="true" class="form-control">
                                <option value="name" selected>Name</option>
                                <option value="description">Description</option>
                                <option value="history">History</option>
                                <option value="status">Status</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                               <!--  <input type="text" name="content" id="content" class="form-control"> -->
                                <textarea type="text" name="content" id="content" class="form-control">
                                </textarea>
                            </div>
                            <input type="hidden" name="sights_id" value="{{ $id }}">
                            <div class="col-md-2">
                                <select id="language" name="language" data-live-search="true" class="form-control">
                                <option value="eng" selected>en</option>
                                <option value="ger">ge</option>
                                <option value="ukr">ua</option>
                                <option value="rus">ru</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <button type="submit" class=" form-control btn btn-primary" id="addSightVocabular">
                                    Add
                                </button>
                            </div>
                        </div>
                    {!! Form::close() !!}
                <div class="phrasesListVocabular">
                        @include('landmark.phrasesListVocabular')
                </div>
                            <div class="form-group row">
                                <div class="col-xs-4 col-xs-offset-4">
                                <a href="/shedule/{{$id}}" target="_blank" class="form-control btn btn-success">Shedule</a>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-xs-4 col-xs-offset-4">
                                <a href="/photo/{{$id}}" target="_blank" class="form-control btn btn-success">Photos</a>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-xs-4 col-xs-offset-4">
                                <a href="/sights/{{$id}}/edit"  class="form-control btn btn-warning">Edit</a>
                                </div>
                            </div>  
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section('additionalScripts')
<script src="{{ asset('js/ajax/sightsvocabular.js') }}"></script>
@endsection