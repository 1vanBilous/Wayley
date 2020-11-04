$(document).ready(function() {

	$('#setTimers').on('click', function (e) {
        e.preventDefault();
        setAllTimers();
    });

    $('#setWeekdaysTimers').on('click', function (e) {
        e.preventDefault();
        setWeekdaysTimers();
    });

    $('#setWeekendsTimers').on('click', function (e) {
        e.preventDefault();
        setWeekendsTimers();
    });

	function setAllTimers()
    {
        var toset_o = $('input[name="toset_o"]').val();
        var toset_c = $('input[name="toset_c"]').val();
     
        $("#mon_o").val(toset_o);
        $("#mon_c").val(toset_c);

        $("#tue_o").val(toset_o);
        $("#tue_c").val(toset_c);

        $("#wed_o").val(toset_o);
        $("#wed_c").val(toset_c);

        $("#thu_o").val(toset_o);
        $("#thu_c").val(toset_c);

        $("#fri_o").val(toset_o);
        $("#fri_c").val(toset_c);

        $("#sat_o").val(toset_o);
        $("#sat_c").val(toset_c);

        $("#sun_o").val(toset_o);
        $("#sun_c").val(toset_c);
    }

    function setWeekdaysTimers()
    {
        var toset_o = $('input[name="toset_o"]').val();
        var toset_c = $('input[name="toset_c"]').val();
     
        $("#mon_o").val(toset_o);
        $("#mon_c").val(toset_c);

        $("#tue_o").val(toset_o);
        $("#tue_c").val(toset_c);

        $("#wed_o").val(toset_o);
        $("#wed_c").val(toset_c);

        $("#thu_o").val(toset_o);
        $("#thu_c").val(toset_c);

        $("#fri_o").val(toset_o);
        $("#fri_c").val(toset_c);
    }

    function setWeekendsTimers()
    {
        var toset_o = $('input[name="toset_o"]').val();
        var toset_c = $('input[name="toset_c"]').val();


        $("#sat_o").val(toset_o);
        $("#sat_c").val(toset_c);

        $("#sun_o").val(toset_o);
        $("#sun_c").val(toset_c);
    }

});