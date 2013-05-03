$(function() {
    $( "#tabs" ).tabs();
    //$( "#selectable" ).selectable();
    $("#selectable").selectable({
        selected: function(event, ui) { 
            var thread = $(ui.selected);
            var date = $("#date-label");
            var business = $("#business-label");
            var eventName = $("#event-label");
            var message_content = $("#message-body");
            $(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");           
            // normally would get message based on message_id...  thread.attr("id");
            date.html(thread.find(".thread-date").html());
            business.html(thread.find(".thread-business").html());
            eventName.html(thread.find(".thread-event").html());
            message_content.html(
             "Hi Max, thanks for reaching out! I'm glad you chose to contact us here at Trader Joe's! In the past, we've mostly supported local community charity events with donations of around $50 or so. We also provide the equivalent amount in gift baskets. We would be happy to do the same for your event. You can give us a call at 617-343-6637. Looking forward to talking with you!" 
            )
        }                   
    });
    $(" .overlay-link[rel] ").overlay();
});   

function addMessage(business, date, eventName, message) {
    $("#selectable").append(); // add info to thread selectable
    //associate message_id in db with message body
}


    
    
    
    
    
    
    
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
