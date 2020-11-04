@foreach($points as $point)
    <div class="form-group row">     
        <div class="col-md-4">
            <select data-live-search="true" class="form-control" disabled>
            <option value="{{$point->venue_id}}" selected>
            {{$point->name}}
            </option>
            </select>
        </div>
        <div class="col-md-2">
            <input type="number" class="form-control" value="{{$point->order}}" disabled/>
        </div>

        <div class="col-md-3">
            <input type="text" class="form-control" 
            value="{{$point->latitude}} ; {{$point->longitude}}" disabled/>
        </div>

        <div class="col-md-2">
            <button class="form-control btn btn-danger delete" id="{{$point->id}}" data-token="{{ csrf_token() }}">Delete</button>
        </div> 
    </div>
@endforeach