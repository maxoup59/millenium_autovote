$(document).ready(function() {

chrome.storage.sync.get(null, function(items) {
    	if(typeof items.id !== "undefined" && typeof items.password !== "undefined")
    	{
    		$("#id").val(items.id);
    		$("#pass").val(items.password);
    	}
    });
    	
    	
$("#save").click(function(){
	chrome.storage.sync.set(
	{"id":$("#id").val(),
	"password":$("#pass").val()}
	,function(){
		alert("saved");
	});
});
});