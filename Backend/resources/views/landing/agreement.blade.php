@extends('layouts.EmptyApp')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Wayley</div>
                <div class="panel-body" style="background: #f2f2f2;">

                <h3> Privacy policy</h3><br>
                <h5> 
1. The term "personal information" used herein is defined as any information that identifies or can be used to identify, communicate or search for the person to whom such information relates. The personal information we collect will be the subject of this privacy policy, as amended from time to time.<br>

2. We do not ask for your email address, phone number or any information about you.<br>

3. We do not sell content.<br>

4. We do not require registration.<br>

5. The security of your personal information will not be compromised.<br>

6. We do not send newsletters to e-mail.<br>

7. We use your device unique number to restrict reviews about venues you almost reviewed, we do not identify you as person by this information.<br>

8. We collect count of visits in venues and tourist routes sections, the device identifying by your phone unique number.<br>
</h5>
<h3>Required permissions</h3><br>
<h5>
1. Access to calls is used for the opportunity in 1 click to call the sight\venue administation.<br>
2. Access to location information is used to display your location on the map.<br>
3. Access to the Internet is used to request information from our servers about the sights, to build routes on the map and also to display the map.<br>
4. Access to the locale storage is used to save information about choosed city.<br>
</h5>
<h3>Contact information</h3><br>
<h5>
E-mail: alexander.ternowy@gmail.com<br>
Phone: +380951530213<br>
Telegram: @ternowy <br>
CEO: Alexander Ternowy, Kharkiv, Ukraine <br>
</h5>



                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('additionalStyles')
<link href="{{ asset('css/sightListtest.css') }}" rel="stylesheet">
@endsection