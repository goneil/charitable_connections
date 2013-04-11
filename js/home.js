var CREATE_LINK = "create.html";
var MY_EVENTS_LINK = "my_events.html";

// from http://basethe.me/theming-tips/squarifying-bootstrap-spans
function squarifyMe(element) {
    squareItUp();
    window.onresize = function(element) {
        squareItUp();
    };
    function squareItUp() {
        $(element).height($(element).width());
    }
}

$(document).ready(function() {
    squarifyMe('.box');
    $("#btnCreate").click(function(){
        document.location.href = CREATE_LINK;
    });
    $("#btnMyEvents").click(function(){
        document.location.href = MY_EVENTS_LINK;
    });

});
