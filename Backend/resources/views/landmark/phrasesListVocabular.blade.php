@foreach($vocabulars as $vocabular)
                        <div class="form-group row">     
                            <div class="col-md-2">
                                <select data-live-search="true" class="form-control" disabled>
                                <option value="" selected>{{$vocabular->field}}</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                 <textarea class="form-control"> {{$vocabular->content}}</textarea>
                            </div>
                            <div class="col-md-2">
                                <select data-live-search="true" class="form-control" disabled>
                                <option value="" selected>{{$vocabular->language}}</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <button class="form-control btn btn-danger delete" id="{{$vocabular->id}}" data-token="{{ csrf_token() }}">Delete</button>
                            </div> 
                        </div>
@endforeach