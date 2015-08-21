	function conversion_seconde_heure(time) {
	    var reste = time;
	    var result = '';

	    var nbHours = Math.trunc(reste / 3600);
	    reste -= nbHours * 3600;

	    var nbMinutes = Math.trunc(reste / 60);
	    reste -= nbMinutes * 60;

	    var nbSeconds = reste;
		var retour = nbHours + "h" + nbMinutes + "m" + nbSeconds + "s";
		//alert(retour);
		return retour;
	}


	$(document).ready(function() {
		chrome.runtime.sendMessage({action: "getNextCheckIn"}, function(response) {
		$("#nextCheckin").html(conversion_seconde_heure(response.nextCheckIn));
});
	});