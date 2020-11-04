@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">All generated discounts</div>
                <div class="panel-body" style="background: #f2f2f2;">

                @foreach($discounts as $discount)
             	    <div class="btn btn-info col-xs-12" style="margin-top: 20px">
                        <div class="col-xs-4">user</div>
                        <div class="col-xs-4">venue</div>
                        <div class="col-xs-4">time</div>
                    </div>
                @endforeach

                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('additionalStyles')

@endsection