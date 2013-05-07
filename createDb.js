var databaseURL = "mydb";
var collections = ["users", "businesses", "messages", "events"];
var db = require("mongojs").connect(databaseURL, collections);
var geocoder = require("geocoder");

var locationsLoaded = 0;

/**
 * Class Business represents different business selections
 * @param {string} name: business name
 * @param {object} info: information object (to be setup later)
 * @param {string} imageLink
 */
var Business = function(name, info, imageLink){
    me = this;
    me.name = name;
    me.description = info.info;
    me.donations = info.donations.split(", ");
    me.location = info.location;
    me.imageLink = imageLink;
    getLocation(me);
};

var getLocation = function(me){
    geocoder.geocode(me.location, function(err, data){
        if (err){
            throw err;
        }
        me.lat = parseFloat(data.results[0].geometry.location.lat);
        me.lng = parseFloat(data.results[0].geometry.location.lng);
        locationsLoaded ++;
        console.log("loaded " + locationsLoaded);
    });
};

var businessList = [
    new Business('Trader Joe\'s',
                 {location: "748 Memorial Dr Cambridge, MA",
                  info:"Profiles specialty retail grocery store in nine states: California, Arizona, Nevada, Oregon, Washington, Massachusetts, New York, Connecticut, and New Jersey.",
                  donations: "Food Baskets"
                 }, './img/businesses/traderjoes.png'),
    new Business('Cambridge Bicycle',
                 {location: "259 Massachusetts Ave  Cambridge, MA 02139",
                  info:"DigThis Boston's Best Bike Shop. BMX, comfort bike, fixed gear, folding bike, hybrid bike, MTB, single speed, track bike.",
                  donations: "Bicycles"
                 }, './img/businesses/cambridgebicycle.png'),
    new Business('Qdoba',
                 {location: "1290 Massachusetts Ave  Cambridge, MA 02138",
                  info:"What will you find at your local Qdoba Mexican Grill? Food for people who love food.",
                  donations: "Food"
                 }, './img/businesses/qdoba.jpg'),
    new Business('Shaw\'s',
                 {location: "20 Sidney St Cambridge",
                  info:"Corporate overview of retail grocery chain, associate newsletter, career opportunities, promotions, weekly specials, and store locator.",
                  donations: "Food, Cookware, Beverages, Gift Certificates"
                 }, './img/businesses/shaws.gif'),
    new Business('Eastern Mountain Sports',
                 {location: "1 Brattle Square #2  Cambridge, MA 02138",
                  info:"Outdoor gear and equipment for sports and adventure.",
                  donations: "Gift Certificates"
                 }, './img/businesses/easternmountainsports.gif'),
    new Business('McDonald\'s',
                 {location: "463 Massachusetts Ave Cambridge",
                  info:"McDonald's in the USA: Food and nutrition info, franchise opportunities, job and career info, restaurant locations, promotional information, history, innovation",
                  donations: "Food, Gift Certificates"
                 }, './img/businesses/mcdonalds.png'),
    new Business('City Sports',
                 {location: "   44 Brattle St  Cambridge, MA 02138",
                  info:"City Sports offers the latest in athletic performance apparel, shoes, and accessories. Shop online to find top brand names and everything you need",
                  donations: "Gift Certificates"
                 }, './img/businesses/citysports.jpg')
];

var intvl = setInterval(function(){
    if (locationsLoaded === businessList.length){
        for (var i = 0; i < businessList.length; i ++){
            console.log(businessList[i].lat);
            db.businesses.insert(businessList[i], function(err, inserted){
                if (err){
                    throw err;
                }
            });
        }
        clearInterval(intvl);
    }
});
