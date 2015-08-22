var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('content/vote.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);

function isConnected()
{
	var connected = false;
	var inputConnexion = $("input[name='connexion_username']").val();
	if (!inputConnexion) {
    	connected = true;
	}
	return connected;
}

function canIVote()
{
	var canI = false;
	var divTimeLeft = $("div:contains('pourrez voter')").html();
    	if (typeof divTimeLeft === "undefined") {
    	canI = true;
	}
	return canI;
}

function readTimeLeft() {
	var divTimeLeft = $("div:contains('pourrez voter')").html();
    var firstIndex = divTimeLeft.indexOf("Vous pourrez voter dans");
    var secondIndex = divTimeLeft.lastIndexOf("Vous pourrez voter dans");
    var timeLeft = divTimeLeft.substring(firstIndex + 29, secondIndex - 71);
    var splited = timeLeft.split(' ');
    var timeLeft = 0;
    for (var i = 0; i < 3; i = i + 2) {
        if (splited[i + 1] == "heure")
           timeLeft = splited[i] * 60 * 60 + timeLeft;
        if (splited[i + 1] == "minute(s)")
            timeLeft = splited[i] * 60 + timeLeft;
        if (splited[i + 1] == "seconde(s)")
            timeLeft = splited[i] * 1 + timeLeft;
    }
    return timeLeft;
}


document.addEventListener('customAPILoaded', function() {
		if(!isConnected())
		{
		chrome.storage.sync.get(null, function(items) {
    	if(typeof items.id !== "undefined" && typeof items.password !== "undefined")
    	{
			$( "input[name='connexion_username']" ).val(items.id);
			$( "input[name='connexion_password']" ).val(items.password);
			chrome.runtime.sendMessage({
    		action: "setInterval",
    		interval: 3
			});
			$( "form[action='index.php']" ).submit();
    	}
    	else 
    	{
    		chrome.runtime.openOptionsPage();
    	}
    });

		}
		else 
		{
			if(!canIVote())
			{
				chrome.runtime.sendMessage({
    			action: "setInterval",
    			interval: readTimeLeft()
				});
			}
			else 
			{
				window.postMessage({ type: "FROM_CONTENT_SCRIPT", text: "vote" }, "*");
			}
		}
});
