var customAPILoaded = new CustomEvent('customAPILoaded');
document.dispatchEvent(customAPILoaded);

function vote() {
    for (var n = 0; n < 100; ++n) {
        Voter(3, '', n, this);
        Voter(4, '', n, this);
    }
    location.reload();
}

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_CONTENT_SCRIPT") ){
    if(event.data.text == "vote")
    {
    	vote();
    }
  }
}, false);
