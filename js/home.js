var CREATE_LINK = "create.html";
var MY_EVENTS_LINK = "my_events.html";

$(document).ready(function() {
    squarifyMe('.box');
    $("#btnCreate").click(function(){
        document.location.href = CREATE_LINK;
    });
    $("#btnMyEvents").click(function(){
        document.location.href = MY_EVENTS_LINK;
    });

});
