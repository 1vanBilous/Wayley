$(document).ready(function() {
	$('input[type="time"]').attr("disabled", true);
	$('#timeblock').hide("slow");

	$('#fullWeek').on('click', function (e) {
	if($(this).prop('checked')){		
		$('input[type="time"]').attr("disabled", true);
		$('#timeblock').hide("slow");
    }else{
		$('input[type="time"]').attr("disabled", false);
		$('#timeblock').show("slow");
    }
    });
});