var interval = 1200000;
var autoMode = false;

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

var timerVote = setInterval(makeAVote, interval);

function updateTimer() {
    window.clearInterval(timerVote);
    if (autoMode == true) {
        chrome.tabs.query({
            url: "http://millenium-servers.com/newvoter.php"
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "timeLeft"
            }, function(response) {
                interval = response.timeLeft * 1000;
                    timerVote = setInterval(makeAVote, interval);
            });
        });
    }
    timerVote = setInterval(makeAVote, interval);
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.action == "initValue")
            sendResponse({
                interval: interval,
                autoMode: autoMode
            });
        else if (request.action == "saveValue") {
            interval = request.interval;
            autoMode = request.autoMode;
            updateTimer();
        }
    });