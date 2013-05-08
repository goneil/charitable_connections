$(function() {
    $( "#tabs" ).tabs();

    var messages = getMessages();
    var messageContainerID = "#msg-selectable";
    var eventContainerID = "#event-selectable";
    var eventFrameContainerID = "#event-frame-container";
    var visContainerID = "#vis-selectable";
    var visFrameContainerID = "#vis-frame-container";
    var hasMessage = false;

    if (messages.length >= 1) {
        hasMessage = true;
        for (var i = 0; i < messages.length; i++) {
            var message = messages[i];
            var date = message.date;
            if (date === undefined) {
                date = "";
            }
            generateNewThread(messageContainerID, message.to, date, message.content.substring(0,40).trim()+"...");
        }
    } else {
        alert("no messages");
    }

    var events = getEvents();
    var hasEvents = false;
    alert();

    if (events.length >= 1) {
        alert("true");
        hasEvents = true;
        for (var i = 0; i < events.length; i++) {
            var newEvent = events[i];
            generateNewThread(eventContainerID, newEvent.type, newEvent.date, newEvent.charities.substring(0,40).trim()+"...");
        }
    } else {
        alert("no events");
    }

    
    //generateNewThread(eventContainerID,"Ice Cream Scoop-athon", "May 25", "Dana Farber");
    //generateNewThread(visContainerID,"Mockasins", "today", "eating");
    //generateVisPane(visFrameContainerID);

    

    $(messageContainerID).selectable({
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
            //eventName.html(thread.find(".thread-event").html());
            message_content.html(content
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
            generateEventPane(eventFrameContainerID);
            //message_content.html(
            //"Hi blah yes"
            //)
        }                   
    });


 });   
                             

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

function generateVisPane(containerID) {
    clearContainer(containerID);
    var visFrame = '<iframe src="business-wc.html"></iframe>';
    $(containerID).append(visFrame);
}

function fillEventPane() {
}

function clearContainer(containerID) {
    $(containerID).empty();
}

var getEvents= function(){
    var events;
    $.ajax({
    url: "./get_events",
    success: function(data){
        events = $.parseJSON(data);
    },  
    async: false
    }); 
    return events;
};

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




