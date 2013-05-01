var CREATE_LINK = "create";
var MY_EVENTS_LINK = "my_events";

$(document).ready(function() {
    squarifyMe('.box');
    $("#btnCreate").click(function(){
        document.location.href = CREATE_LINK;
    });
    $("#btnMyEvents").click(function(){
        document.location.href = MY_EVENTS_LINK;
    });

});
