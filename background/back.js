var timerVote = null;
var nextCheckIn = null;

function refresh()
{
	var newURL = "http://millenium-servers.com/newvoter.php";
    	chrome.tabs.query({
        	url: newURL
    	}, function(tabs) {
        	if (tabs.length == 0) {
            	chrome.tabs.create({
                	url: newURL
            	});
        	} else {
          	 chrome.tabs.reload(tabs[0].id);
        	}
    	});
}

function getRandom()
{
	var rand = (Math.random()*60)+1;
	return rand;
}

function updateTimer(interval) {
    window.clearInterval(timerVote);
    if (isNaN(interval))
        interval = 2;
    interval = interval + getRandom();
    timerVote = setInterval(refresh, interval* 1000);
    var date = new Date();
    nextCheckIn = date.setSeconds(date.getSeconds() + interval);
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "setInterval") {
            updateTimer(request.interval);
        } else if (request.action == "getNextCheckIn") {
            sendResponse({
                nextCheckIn: nextCheckIn
            });
        }
    });


refresh();
/*function verifyAndSaveLicense(license)
{
	if(license.accessLevel == "FULL")
	{
		alert("ok");
	}
}

chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
var CWS_LICENSE_API_URL = 'https://www.googleapis.com/chromewebstore/v1.1/userlicenses/aepbggimipmchoefgjeoihiakogjhfgd';
var req = new XMLHttpRequest();
req.open('GET', CWS_LICENSE_API_URL + chrome.runtime.id);
req.setRequestHeader('Authorization', 'Bearer ' + token);
req.onreadystatechange = function() {
  if (req.readyState == 4) {
    var license = JSON.parse(req.responseText);
    verifyAndSaveLicense(license);
  }
}
req.send();

});*/