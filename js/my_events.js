$(function() {
    $( "#tabs" ).tabs();

    var messages = getMessages();
    //generateThreads(messages);
    var messageContainerID = "#msg-selectable";

    /*



    */


    generateNewThread(messageContainerID,"Mockasins", "today", "eating");

    $("#msg-selectable").selectable({
        selected: function(event, ui) { 
            var thread = $(ui.selected);
            var messageID = parseInt(thread.attr("id").split("message")[1]);
            var content = messages[messageID].content;
            var date = $("#msg-date-label");
            var business = $("#msg-business-label");
            var eventName = $("#msg-event-label");
            var message_content = $("#msg-message-body");
            $(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");         
            date.html(thread.find(".thread-date").html());
            business.html(thread.find(".thread-business").html());
            eventName.html(thread.find(".thread-event").html());
            message_content.html(content            
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
function generateMessageThreads(messageList, containerID, business, date, eventName) {
    for (int i = 0; i < messageList.length; i++) {
        var message = messageList[i];
        generateNewThread(containerID, message.to, message.from, eventName);
    }
}
*/


function generateNewThread(containerID, business, date, eventName) {
    var threadID = getNewThreadID(containerID);
    if (threadID == 1) {
        clearContainer(containerID);
    }
    var new_thread = '<li id="message' + threadID + '" class="ui-widget-content"><div class="row-fluid"><div class="span10 thread-business">' + business + '</div><div class="span2 thread-date">' + date + '</div></div><div class="row-fluid thread-event-container"><div class="span12 thread-event">' + eventName + '</div></div></li>';
    $(containerID).append(new_thread);
}

function getNewThreadID(containerID) {
    var children = $(containerID).children("li");
    return children.length + 1;
}

function clearContainer(containerID) {
    $(containerID).empty();
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




