$(function() {
    $( "#tabs" ).tabs();
    addMessage("","","","");
    //$( "#selectable" ).selectable();
    $("#msg-selectable").selectable({
        selected: function(event, ui) { 
            var thread = $(ui.selected);
            var date = $("#msg-date-label");
            var business = $("#msg-business-label");
            var eventName = $("#msg-event-label");
            var message_content = $("#msg-message-body");
            $(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");           
            //addMessage("","","","");
            // normally would get message based on message_id...  thread.attr("id");
            date.html(thread.find(".thread-date").html());
            business.html(thread.find(".thread-business").html());
            eventName.html(thread.find(".thread-event").html());
            message_content.html(
             "Hi Max, thanks for reaching out! I'm glad you chose to contact us here at Trader Joe's! In the past, we've mostly supported local community charity events with donations of around $50 or so. We also provide the equivalent amount in gift baskets. We would be happy to do the same for your event. You can give us a call at 617-343-6637. Looking forward to talking with you!" 
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
            //addMessage("","","","");
            // normally would get message based on message_id...  thread.attr("id");
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

    /*
    $.get("./get_messages", {id: $.getUrlVar("_id")}, function(data){
        data = $.parseJSON(data);
        console.log(data);
    }
    */

    //$(" .overlay-link[rel] ").overlay();
});   

/*
var message_block = "<li id='message1' class='ui-widget-content'> \
                                    <div class='row-fluid'> \
                                        <div class='span10 thread-business'> \
                                            The Jimmy Fund, Dana Farber \
                                       </div> \
                                        <div class="span2 thread-date"> \
                                            Apr 30 \
                                        </div> \
                                    </div> \
                                    <div class="row-fluid thread-event-container"> \
                                        <div class="span12 thread-event"> \
                                            Ice-Cream Scoopathon for Dana Farber \
                                        </div> \
                                    </div> \
                                </li>";
 
 */

var $new_li = $('<li class="ui-widget-content"/>');
var $new_row = $('div class="row-fluid"/>');
var $new_thread_business = $('<div class="span10 thread-business" />');
var $new_thread_date= $('<div class="span2 thread-date" />');
var $new_thread_container = $('<div class="row-fluid thread-event-container" />');
var $new_thread_event = $('<div class="span12 thread-event" />');

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



function addMessage(business, date, eventName, message) {
    $("#msg-selectable").append($new_li); // add info to thread selectable
    $(new_li).append($new_row);
}

$.get("./get_event", {id: $.getUrlVar("event_id")}, function(data){
    data = $.parseJSON(data);
    console.log(data);
});

//function loadSelectable(messageLabel, dateLabel, businessLabl

    
/**
    //$( document ).tooltip();
    alert("ready");
     var businessList = [
        new Business('Trader Joe\'s',
                     {location: "748 Memorial Dr Cambridge (617) 491-8582",
                      info:"Trader Joes info",
                      donations: "Food Baskets"
                     }, './img/businesses/traderjoes.png'),
        new Business('Cambridge Bicycle',
                     {location: "259 Massachusetts Ave  Cambridge, MA 02139 (617) 876-6555",
                      info:"Cambridge bike info",
                      donations: "Bicycles"
                     }, './img/businesses/cambridgebicycle.png'),
        new Business('Qdoba',
                     {location: "1290 Massachusetts Ave  Cambridge, MA 02138 (617) 871-1136",
                      info:"Qdoba info",
                      donations: "Food"
                     }, './img/businesses/qdoba.jpg'),
        new Business('Shaw\'s',
                     {location: "20 Sidney St Cambridge (617) 494-5250",
                      info:"Shaws info",
                      donations: "Food, Cookware, Beverages, Gift Certificates"
                     }, './img/businesses/shaws.gif'),
        new Business('Eastern Mountain Sports',
                     {locadtion: "1 Brattle Square #2  Cambridge, MA 02138 (617) 864-2061",
                      info:"ems info",
                      donations: "Gift Certificates"
                     }, './img/businesses/easternmountainsports.gif'),
        new Business('McDonald\'s',
                     {location: "463 Massachusetts Ave Cambridge (617) 497-3926",
                      info:"McDonald's info",
                      donations: "Food, Gift Certificates"
                     }, './img/businesses/mcdonalds.png'),
        new Business('City Sports',
                     {location: "   44 Brattle St  Cambridge, MA 02138 (617) 492-6000",
                      info:"City Sports info",
                      donations: "Gift Certificates"
                     }, './img/businesses/citysports.jpg')
    ];

    var organizationList = [
        new Organization('Sports Authority',
            {location: "710 Massachusetts Ave., Cambridge, MA",
            isBusiness = true,
            donations: "Gift Certificates"
            }, './img/businesses/citysports.jpg'),
        new Organization('Jimmy Fund',
            {location: "15 Beacon St., Brookline, MA",
            isBusiness = false,
            donations: "Money"
            }, './img/jimmy_fund.png')
    };
    var eventList = [
        new Event('Curl Til You Hurl',
                     {location: "Cambridge, MA",
                      businesses,
                      donations: "Gift Certificates"
                     }, './img/businesses/citysports.jpg')
    ];

    $("#connections").append('<div id="businessRow" class="row" >\
        <div class="span12"
        ');

    $("#btnNext").click(function(){
        index = nextFunc(businessList, index, numSuggestions);
    });

};


var Event = function(name, info, imageLink){
    me = this;
    me.name = name;
    me.info = info;
    me.imageLink = imageLink;
};
var Organization = function(name, info, imageLink){
    me = this;
    me.name = name;
    me.info = info;
    me.imageLink = imageLink;
};
var Business = function(name, info, imageLink){
    me = this;
    me.name = name;
    me.info = info;
    me.imageLink = imageLink;
};


});

**/
