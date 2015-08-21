var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('content/vote.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);

chrome.runtime.sendMessage({
	action:"interval",
    interval: readTimeLeft()
});

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

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        /*if (request.action == "timeLeft") {
            sendResponse({
                timeLeft: readTimeLeft()
            });
        }*/
    });