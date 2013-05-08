$(function() {
    $( "#tabs" ).tabs();

    var messages = getMessages();

    $("#msg-selectable").selectable({
        selected: function(event, ui) { 
            var thread = $(ui.selected);
            var date = $("#msg-date-label");
            var business = $("#msg-business-label");
            var eventName = $("#msg-event-label");
            var message_content = $("#msg-message-body");
            $(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");           
            date.html(thread.find(".thread-date").html());
            business.html(thread.find(".thread-business").html());
            eventName.html(thread.find(".thread-event").html());
            message_content.html(""            
            )
        }                   
    });

    $("#event-selectable").selectable({
        selected: function(event, ui) { 
            var thread = $(ui.selected);
            var date = $("#event-date-label");
            var business = $("#event-business-label");
            var eventName = $("#event-event-label");
            var message_content = $("#event-message-body");
            $(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");           
            date.html(thread.find(".thread-date").html());
            business.html(thread.find(".thread-business").html());
            eventName.html(thread.find(".thread-event").html());
            message_content.html(
            "Hi blah yes"
            )
        }                   
    });

    $("#vis-selectable").selectable({
        selected: function(event, ui) { 
            var thread = $(ui.selected);
            var date = $("#vis-date-label");
            var business = $("#vis-business-label");
            var eventName = $("#vis-event-label");
            var message_content = $("#vis-message-body");
            $(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");           
            //addMessage("","","","");
            // normally would get message based on message_id...  thread.attr("id");
            date.html(thread.find(".thread-date").html());
            business.html(thread.find(".thread-business").html());
            eventName.html(thread.find(".thread-event").html());
            message_content.html(
            "Hi Blah yes"
            )
        }                   
    });
 });   
                                /*
                                    <div class="row-fluid">
                                        <div class="span10 thread-business">
                                            Trader Joe's
                                        </div>
                                        <div class="span2 thread-date">
                                            Apr 30
                                        </div>
                                    </div>
                                    <div class="row-fluid thread-event-container">
                                        <div class="span12 thread-event">
                                            Ice-Cream Scoopathon for Dana Farber
                                        </div>
                                    </div>
                                    */

/*
var $new_li = $('<li class="ui-widget-content"/>');
var $new_row = $('div class="row-fluid"/>');
var $new_thread_business = $('<div class="span10 thread-business" />');
var $new_thread_date= $('<div class="span2 thread-date" />');
var $new_thread_container = $('<div class="row-fluid thread-event-container" />');
var $new_thread_event = $('<div class="span12 thread-event" />');

function addMessage(business, date, eventName, message) {
    $($new_li).append(
        $($new_row).append(
            $($new_thread_business).text("Hello")
        ).append(
            $($new_thread_date).text("Hello") 
        )
    ).append(
        $($new_thread_container).append(
            $($new_thread_event)//.text("Hello")
        )
    ).appendTo("#msg-selectable");
}
*/

function addTest() {
    //alert();
    //$("#msg-selectable").append($new_li);
}

var getMessages = function(){
    var messages;
    $.ajax({
    url: "./get_messages",
    success: function(data){
        messages = $.parseJSON(data);
    },  
    async: false
    }); 
    return messages;
};

function generateThread() {

}

function generateMultipleThreads(number) {
    //for (int i = 0; i < number; i++) {
        //$("#msg-selectable").append("");
   // }
}

function generateThreadContent(thread_element, content) {
    //alert();
}


