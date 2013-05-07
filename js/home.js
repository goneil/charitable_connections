var CREATE_LINK = "create";
var MY_EVENTS_LINK = "my_events";

$(document).ready(function() {

    squarifyMe('.box');
    $(".dropdown-toggle").dropdown();
    $("#btnCreate").click(function(){
        $.ajax({
            url:"./create_event",
            type: "post",
            success: function(data){
                var id = $.parseJSON(data).id;
                document.location.href = CREATE_LINK + "?event_id=" + id;
            }
        });

    });
    $("#btnMyEvents").click(function(){
        document.location.href = MY_EVENTS_LINK;
    });
});
