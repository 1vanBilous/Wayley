$(document).ready(function() {
     var inputId = $('input[name="sights_id"]').val();
    $('#addSightVocabular').on('click', function (e) {
        e.preventDefault();

        var inputField = $('select[name="field"]').val();
        var inputContent = $('textarea[name="content"]').val();
        var inputLanguage = $('select[name="language"]').val();
        var inputId = $('input[name="sights_id"]').val();
        var token = $('input[name="_token"]').val();
        var data = {_token:token, field:inputField, content:inputContent, language:inputLanguage, sights_id:inputId};

        $.ajaxSetup({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
        });  

        var request = $.ajax({
            type: "POST",
            url: '/SightV',
            data: data,
        });

        request.done(function( msg ) {
            console.log(msg.message);
            refreshTable();
        });

        request.fail(function( jqXHR, textStatus ) { console.log( "Request failed: " + textStatus ); });
    });



    $('.phrasesListVocabular').on('click', 'button', function (e) {
        console.log('clicked');
        var id = $(this).attr('id');
        var token = $(this).data('token');
        var data = {_token:token, _method:"delete"};

        var request = $.ajax({
            type: "post",
            url: '/SightV/'+id,
            data: data,
        });

        request.done(function( msg ) {
            console.log(msg.message);
            refreshTable(); //Maybee not working
        });

        request.fail(function( jqXHR, textStatus ) { console.log( "Request failed: " + textStatus ); });
          
    });

    function refreshTable() {
      $('div.phrasesListVocabular').fadeOut(250);
      $('div.phrasesListVocabular').load('/SightV/getData/'+inputId, function() {
          $('div.phrasesListVocabular').fadeIn();
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

