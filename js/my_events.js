$(document).ready(function() {

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

/**
 * Class Event represents events
 * @param {string} name: name of event
 * @param {object} info: information object (to be setup later)
 * @param {string} imageLink
 */
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
