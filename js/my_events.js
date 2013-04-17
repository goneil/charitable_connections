$(document).ready(function() {
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

