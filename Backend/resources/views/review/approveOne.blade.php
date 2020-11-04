@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">Menu</div>
                <div class="panel-body">

                    {{$review->review_text}}
                    Оценка - 
                    {{$review->rating}} звезды
                    
               
                    <div class="form-group row col-xs-12">
                    <a class="btn btn-sm btn-success" href="/review/{{$review->id}}/approve">
                        Approve
                    </a>
                    </div>  

                    <div class="form-group row col-xs-12" >
                    <a class="btn btn-sm btn-warning" href="/review/{{$review->id}}/decline">
                        Decline
                    </a>
                    </div>  

                    <form method="POST" action="/review/{{$review->id}}" class="col-xs-12">
                                  {{ csrf_field() }}
                                  {{ method_field('DELETE') }}
                                  <div class="form-group row col-xs-12">
                                    <button class="btn btn-sm btn-danger">
                                        Delete
                                    </button>
                                  </div>  
                    </form>
                   
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section('additionalScripts')
@endsection
