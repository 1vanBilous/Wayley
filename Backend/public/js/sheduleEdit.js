$(document).ready(function() {
	
	

	$('#fullWeek').on('click', function (e) {
	if($(this).prop('checked')){		
		$('input[type="time"]').attr("disabled", true);
		$('#timeblock').hide("slow");
    }else{
		$('input[type="time"]').attr("disabled", false);
		$('#timeblock').show("slow");
    }
    });

	$('#setTimers').on('click', function (e) {
        e.preventDefault();

        
    });

	function setAllTimers()
    {
        var toset_o = $('select[name="toset_o"]').val();
        var toset_c = $('select[name="toset_c"]').val();

        
    }
});