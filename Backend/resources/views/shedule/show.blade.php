@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">Menu</div>
                <div class="panel-body">
                        @foreach($Shedules as $shedule)
                        <div class="form-group row">
                            <div class="col-xs-2">
                                <div class="col-xs-12">Mon</div>
                                <div class="col-xs-12">Tue</div>
                                <div class="col-xs-12">Wed</div>
                                <div class="col-xs-12">Thu</div>
                                <div class="col-xs-12">Fri</div>
                                <div class="col-xs-12">Sat</div>
                                <div class="col-xs-12">Sun</div>
                            </div>     
                            <div class="col-xs-5">
                                <div class="col-xs-12">{{$shedule->mon_o}}</div>
                                <div class="col-xs-12">{{$shedule->tue_o}}</div>
                                <div class="col-xs-12">{{$shedule->wed_o}}</div>
                                <div class="col-xs-12">{{$shedule->thu_o}}</div>
                                <div class="col-xs-12">{{$shedule->fri_o}}</div>
                                <div class="col-xs-12">{{$shedule->sat_o}}</div>
                                <div class="col-xs-12">{{$shedule->sun_o}}</div>
                            </div>
                            <div class="col-xs-5">
                                <div class="col-xs-12">{{$shedule->mon_c}}</div>
                                <div class="col-xs-12">{{$shedule->tue_c}}</div>
                                <div class="col-xs-12">{{$shedule->wed_c}}</div>
                                <div class="col-xs-12">{{$shedule->thu_c}}</div>
                                <div class="col-xs-12">{{$shedule->fri_c}}</div>
                                <div class="col-xs-12">{{$shedule->sat_c}}</div>
                                <div class="col-xs-12">{{$shedule->sun_c}}</div>
                            </div>
                        </div>
                        @endforeach


                            <div class="form-group row">
                                <div class="col-xs-4 col-xs-offset-4">
                                <a href="/shedule/{{$id}}" target="_blank" class="form-control btn btn-success">Edit</a>
                                </div>
                            </div>
                
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

