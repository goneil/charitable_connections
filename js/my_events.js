$(document).ready(function() {
    var businessList = [
        new Business('City Sports',
                     {location: "   44 Brattle St  Cambridge, MA 02138 (617) 492-6000",
                      info:"City Sports info",
                      donations: "Gift Certificates"
                     }, './img/businesses/citysports.jpg')
    ];

    $("#btnNext").click(function(){
        index = nextFunc(businessList, index, numSuggestions);
    });

};


/**
 * Class Event represents events
 * @param {string} eventName: name of event
 * @param {string} business: name of business sponsor
 * @param {object} info: information object (to be setup later)
 * @param {string} imageLink
 */
var Business = function(name, info, imageLink){
    me = this;
    me.name = name;
    me.info = info;
    me.imageLink = imageLink;
};
