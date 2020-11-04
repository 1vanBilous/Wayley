@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">All discounts</div>
                <div class="panel-body" style="background: #f2f2f2;">

                <div class="col-xs-12">
                    <a href="/discounts/create" class="btn btn-success">
                        Create a new one
                    </a>
                    
                    <a href="/discounts/generated/list" class="btn btn-info">
                        Generated
                    </a>
                </div>

                @foreach($discounts as $discount)
             	    <div class="btn btn-info col-xs-12" style="margin-top: 20px">
                        <div class="col-xs-3" style="padding: 7px">
                            {{$discount->venue_name}}
                        </div>
                        <div class="col-xs-2" style="padding: 7px">
                            {{$discount->discount}}
                        </div>
                        <div class="col-xs-2" style="padding: 7px">
                            {{ $discount->active ? "Active" : "Not active" }}
                        </div>
                        <a class="col-xs-3 btn btn-warning" href="/discounts/{{$discount->id}}/edit">
                            edit
                        </a>

                        <form method="POST" action="/discounts/{{$discount->id}}" class="col-xs-2">
                            {{ csrf_field() }}
                            {{ method_field('DELETE') }}
                            <button class="btn btn-danger">
                                Delete
                            </button>
                        </form>
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