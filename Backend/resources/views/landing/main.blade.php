@extends('landing.application')

@section('content')



<div id="myCarousel" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators" style="margin-bottom: 15vh">
  	"P"
  </ol>
  <ol class="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner">
    <div class="item active">
      <img src="/images/landing/6.jpg" alt="Los Angeles">
    </div>

    <div class="item">
      <img src="/images/landing/4.jpg" alt="Chicago">
    </div>

    <div class="item">
      <img src="/images/landing/2.jpg" alt="New York">
    </div>
  </div>

  <!-- Left and right controls -->
  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#myCarousel" data-slide="next">

    <span class="sr-only">Next</span>
  </a>
</div>




@endsection

@section('additionalStyles')
<link href="{{ asset('css/landing/carousel.css') }}" rel="stylesheet">
@endsection

@section('additionalScripts')
<script src="{{ asset('js/carousel.js') }}"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
@endsection