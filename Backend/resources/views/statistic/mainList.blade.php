@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">Menu</div>
                <div class="panel-body" style="background: #f2f2f2;">

                    @foreach($stats as $stat)
                        <div class="col-xs-12">
                            <div class="col-xs-4">
                            </div>
                            <div class="col-xs-4">
                            </div>
                            <div class="col-xs-4">
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