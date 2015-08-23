$(document).ready(function() {
	    chrome.runtime.sendMessage({
	        action: "getNextCheckIn"
	    }, function(response) {
	    	//alert(response.nextCheckIn);
    		var date = new Date(response.nextCheckIn);
	        $("#nextCheckin").html(date.getHours() + ":" +
	          date.getMinutes() + ":" +
	           date.getSeconds());
	    });
		chrome.storage.sync.get(null, function(items) {
    	if(typeof items.id === "undefined"|| typeof items.password === "undefined")
    	{
    		chrome.runtime.openOptionsPage();
    	}
		});
		$("#Bout").click(function(){
			chrome.runtime.openOptionsPage();
		});
		
	});