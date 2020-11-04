@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">Menu</div>
                <div class="panel-body" style="background: #f2f2f2;">
                    <form method="POST" action="/places/{{$venue->id}}" class="col-xs-6">
                    {{ csrf_field() }}
                    {{ method_field('DELETE') }}
                    <div class="form-group row col-xs-12">
                    <button class="btn btn-sm btn-outline-secondary">
                    Delete
                    </button>
                    </div>  
                    </form>
                    <div class="form-group row col-xs-12">
                    <a class="btn btn-sm btn-outline-secondary" href="/places/{{$venue->id}}/edit">
                        Edit
                    </a>
                    </div>  
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('additionalStyles')
<link href="{{ asset('css/sightListtest.css') }}" rel="stylesheet">
@endsection