var interval = 1200;
var nextCheckIn = 0;
function makeAVote() {
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
var timerVote;
makeAVote();

function updateTimer() {
    window.clearInterval(timerVote);
    if(interval <= 0)
    	interval = 2;
    timerVote = setInterval(makeAVote, interval * 1000);
    var date = new Date();
	var seconds = date.getSeconds();
	var minutes = date.getMinutes();
	var hour = date.getHours();
	nextCheckIn = seconds+minutes*60+hour*3600+interval;
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.action == "interval") {
                interval = request.interval;
                updateTimer();
        }
        else if(request.action =="getNextCheckIn")
        {
        	sendResponse({nextCheckIn : nextCheckIn});
        }
    });