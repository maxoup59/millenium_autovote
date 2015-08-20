function makeAVote()
{
    var newURL = "http://millenium-servers.com/newvoter.php";
    chrome.tabs.query({url:newURL}, function (tabs)
                      {
                      if(tabs.length == 0)
                      {
                      chrome.tabs.create({ url: newURL });
                      }
                      else
                      {
                      chrome.tabs.reload(tabs[0].id);
                      }
                      });
}

setInterval(makeAVote, 1200000);


