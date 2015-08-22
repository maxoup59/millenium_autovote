$(document).ready(function() {
	    chrome.runtime.sendMessage({
	        action: "getNextCheckIn"
	    }, function(response) {
	    	//alert(response.nextCheckIn);
    		var date = new Date(response.nextCheckIn);
	        $("#nextCheckin").html("Prochain vote a " +
	         date.getHours() + "h" +
	          date.getMinutes() + "m" +
	           date.getSeconds() + "s");
	    });
		chrome.storage.sync.get(null, function(items) {
    	if(typeof items.id === "undefined"|| typeof items.password === "undefined")
    	{
    		chrome.runtime.openOptionsPage();
    	}
		});
	});