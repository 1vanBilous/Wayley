@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">How to get API</div>
                <div class="panel-body" style="">
                  <div class="col-xs-12">
                    1) <a href="https://klugdata.com/api/sights/kharkiv/rus" target="_blank"> https://klugdata.com/api/sights/kharkiv/{language} </a> Получить все достопримечательности в Харькове
                  </div> 

                  <div class="col-xs-12">
                    2) <a href="https://klugdata.com/api/sight/4/rus"> https://klugdata.com/api/sight/{id}/{language} </a> Получить информацию об 1й достопримечательности по id
                  </div> 

                  <div class="col-xs-12">
                    2) <a href="https://klugdata.com/api/sight-photo/4"> https://klugdata.com/api/sight-photo/{id} </a> Получить все фото 1й достопримечательности по id
                  </div> 
                  <!-- <div class="col-xs-12">
                    3) <a href="https://klugdata.com/api/sight/vocabular/4/rus"> https://klugdata.com/api/sight/vocabular/{id}/{language} </a> Получить список фраз об 1й достопримечательности на языке. 
                  </div>  -->
                   <div class="col-xs-12">
                  Параметры language:
                    rus
                    ukr
                    ger
                    eng
                    </div> 
                  
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('additionalStyles')

@endsection