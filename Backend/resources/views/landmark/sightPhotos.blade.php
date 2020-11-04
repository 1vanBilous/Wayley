@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        @include('layouts.lMenu')
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">Menu</div>
                <div class="panel-body">
                    {!! Form::open(['url'=>'/photo', 'files'=>true]) !!}
                
                        <input type="hidden" name="sights_id" value="{{ $id }}">

                        <div class="form-group row">
                            <label for="photo" class="col-md-4 col-form-label text-md-right">Photo</label>
                            <div class="col-md-6">
                                 {!! Form::file('image', array('class' => 'form-control', 'required' =>'required')) !!}
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Create
                                </button>
                            </div>
                        </div>
                    {!! Form::close() !!}
                

                    @foreach($photos as $photo)
                     <div class="col-xs-12">
                         <img src="{{$photo->photo}}">                 
                     </div>
                        <form method="POST" action="/photo/{{$photo->id}}" class="col-xs-12">
                                  {{ csrf_field() }}
                                  {{ method_field('DELETE') }}
                            <div class="form-group row col-xs-12">
                            <button class="btn btn-sm btn-outline-secondary">
                                Delete
                            </button>
                            </div>  
                        </form>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

