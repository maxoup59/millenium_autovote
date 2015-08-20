
function initValue() {
  
    chrome.runtime.sendMessage({
        action: "initValue"
    }, function(response) {
        $("#interval").val(response.interval);
        if (response.autoMode == true) {
            $('#auto').prop('checked', true);
        } else {
            $('#auto').prop('checked', false);
        }
    });
}

$(document).ready(function() {
    initValue();
    $('#save').click(function() {
        chrome.runtime.sendMessage({
            action: "saveValue",
            interval: $("#interval").val(),
            autoMode: $("#auto").is(":checked")
        });
    })
});