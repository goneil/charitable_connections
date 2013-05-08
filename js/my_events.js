$(function() {
    $( "#tabs" ).tabs();

    var messages = getMessages();
    var messageContainerID = "#msg-selectable";
    var eventContainerID = "#event-selectable";
    var eventFrameContainerID = "#event-frame-container";
    //generateNewThread(messageContainerID,"Mockasins", "today", "eating");
    //generateNewThread(eventContainerID,"Mockasins", "today", "eating");

    $(messageContainerID).selectable({
        selected: function(event, ui) { 
            var thread = $(ui.selected);
            //var messageID = parseInt(thread.attr("id").split("message")[1]);
            //var content = messages[messageID].content;
            var date = $("#msg-date-label");
            var business = $("#msg-business-label");
            var eventName = $("#msg-event-label");
            var message_content = $("#msg-message-body");
            $(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");         
            date.html(thread.find(".thread-date").html());
            business.html(thread.find(".thread-business").html());
            eventName.html(thread.find(".thread-event").html());
            message_content.html(
            "hello hola mi hola"
            )
        }                   
    });

    $(eventContainerID).selectable({
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
            generateEventPane(containerID);
            //message_content.html(
            //"Hi blah yes"
            //)
        }                   
    });

    /*
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
            )
        }                   
    });
    */

 });   
                             
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

function generateEventPane(containerID) {
    clearContainer(containerID);
    var eventFrame = '<div class="span12" id="eventFrame"><table id="eventTable"><tr><td id="charity_pane" class="pane"><div class="pane_label">Charity</div><div id="charity_icons"></div></td><td id="logistics_pane" class="pane"><div class="pane_label">Logistics</div><div id="logistics_icons"><div id="date_icon" class="log_icon"><div id ="date_label"></div></div><div id="loc_icon" class="log_icon"><div id="loc_label">Welcome To</div></div></div></td></tr><tr><td id="event_pane" class="pane"><div class="pane_label">Event</div><div id="event_icons"></div></td><td id="donations_pane" class="pane"><div class="pane_label">Donations</div><div id="donation_icons"></div></td></tr></table></div>';
    $(containerID).append(eventFrame);
}

function fillEventPane() {
}

function clearContainer(containerID) {
    $(containerID).empty();
}

/*
 <li id="message1" class="ui-widget-content">
                                    <div class="row-fluid">
                                        <div class="span12 thread-business">
                                            Charity connections word cloud
                                        </div>
                                    </div>
                                    <div class="row-fluid thread-event-container">
                                        <div class="span12 thread-event">
                                            View the charities you've supported. 
                                        </div>
                                    </div>
                                </li>

                                <li id="message1" class="ui-widget-content">
                                    <div class="row-fluid">
                                        <div class="span12 thread-business">
                                            Business connections word cloud
                                        </div>
                                    </div>
                                    <div class="row-fluid thread-event-container">
                                        <div class="span12 thread-event">
                                            View the businesses you've contacted. 
                                        </div>
                                    </div>
                                </li>
*/


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




