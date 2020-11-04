$(document).ready(function() {
    var inputRouteId = $('input[name="route_id"]').val();
    $('#addPointToRoute').on('click', function (e) {
        e.preventDefault();

        var inputVenueId = $('select[name="venue_id"]').val();
        var inputOrder = $('input[name="order"]').val();

        var inputLatitude = $('input[name="latitude"]').val();
        var inputLongitude = $('input[name="longitude"]').val();

        var inputRouteId = $('input[name="route_id"]').val();

        var token = $('input[name="_token"]').val();
        var data = {
            _token:token, 
            venue_id:inputVenueId, 
            order:inputOrder, 
            latitude:inputLatitude,
            longitude:inputLongitude, 
            route_id:inputRouteId
                    };

        $.ajaxSetup({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
        });  

        var request = $.ajax({
            type: "POST",
            url: '/points',
            data: data,
        });

        request.done(function( msg ) {
            console.log(msg.message);
            refreshTable();
        });

        request.fail(function( jqXHR, textStatus ) { console.log( "Request failed: " + textStatus ); });
    });



    $('.pointsList').on('click', 'button', function (e) {
        console.log('clicked');
        var id = $(this).attr('id');
        var token = $(this).data('token');
        var data = {_token:token, _method:"delete"};

        var request = $.ajax({
            type: "post",
            url: '/points/'+id,
            data: data,
        });

        request.done(function( msg ) {
            console.log(msg.message);
            refreshTable(); //Maybee not working
        });

        request.fail(function( jqXHR, textStatus ) { console.log( "Request failed: " + textStatus ); });
          
    });

    function refreshTable() {
      $('div.pointsList').fadeOut(250);
      $('div.pointsList').load('/points/'+inputRouteId, function() {
          $('div.pointsList').fadeIn();
      });
    }


   
});

      














































/*
    $('#closeAccess').on('click', function (event) {
        event.preventDefault();

        var id = $(this).data("id");
        
           // Button Content
           
        $.get('/disable'+id , function(){ 
          $(this).hide();
           $(this).closest("#openAccess").show();
        }).fail(function() {
        alert( "error" );
        });

    });

    $('#openAccess').on('click', function (event) {
        event.preventDefault();

        var id = $(this).data("id");

          
          
        $.get('/able'+id , function(){ 
           $(this).hide();
           $(this).closest("#closeAccess").show();
        }).fail(function() {
        alert( "error" );
        });

    });

    $('#deleteLink').on('click', function (event) {
        event.preventDefault();

        var id = $(this).data("id");

        $("#link"+id).animate({"left": "-=3000px"}, "medium");
        $("#link"+id).queue(function () {
            $("#link"+id).remove();
        });

        $.get('/delete'+id , function(){ 
        }).fail(function() {
          alert( "error" );
        });
    });
    
*/

