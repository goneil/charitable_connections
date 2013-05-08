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
    me.types = info.types;
    me.charities = info.charities;
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
                  donations: "Food",
                  types: ["Education", "Reading"],
                  charities: ["Jimmy Fund", "USO"]
                 }, './img/businesses/traderjoes.png'),
    new Business('Cambridge Bicycle',
                 {location: "259 Massachusetts Ave  Cambridge, MA 02139",
                  info:"DigThis Boston's Best Bike Shop. BMX, comfort bike, fixed gear, folding bike, hybrid bike, MTB, single speed, track bike.",
                  donations: "Bicycles, General",
                  types: ["Community", "Local"],
                  charities: ["Green Laces"]
                 }, './img/businesses/cambridgebicycle.png'),
    new Business('Qdoba',
                 {location: "1290 Massachusetts Ave  Cambridge, MA 02138",
                  info:"What will you find at your local Qdoba Mexican Grill? Food for people who love food.",
                  donations: "Food",
                  types: ["Community", "Local"],
                  charities: ["American Cancer Society", "American Red Cross"]
                 }, './img/businesses/qdoba.jpg'),
    new Business('Shaw\'s',
                 {location: "20 Sidney St Cambridge",
                  info:"Corporate overview of retail grocery chain, associate newsletter, career opportunities, promotions, weekly specials, and store locator.",
                  donations: "Food, Cookware, Beverages, Gift Cards",
                  types: ["Cooking", "Local", "Education"],
                  charities: ["Partners in Health", "American Red Cross"]
                 }, './img/businesses/shaws.gif'),
    new Business('Eastern Mountain Sports',
                 {location: "1 Brattle Square #2  Cambridge, MA 02138",
                  info:"Outdoor gear and equipment for sports and adventure.",
                  donations: "Gift Cards",
                  types: ["Outdoors"],
                  charities: ["Partners in Health", "USO"]
                 }, './img/businesses/easternmountainsports.gif'),
    new Business('McDonald\'s',
                 {location: "463 Massachusetts Ave Cambridge",
                  info:"McDonald's in the USA: Food and nutrition info, franchise opportunities, job and career info, restaurant locations, promotional information, history, innovation",
                  donations: "Food, Gift Cards",
                  types: ["Community", "Education"],
                  charities: ["Green Laces", "USO"]
                 }, './img/businesses/mcdonalds.png'),
    new Business('City Sports',
                 {location: "   44 Brattle St  Cambridge, MA 02138",
                  info:"City Sports offers the latest in athletic performance apparel, shoes, and accessories. Shop online to find top brand names and everything you need",
                  donations: "Gift Cards",
                  types: ["Outdoors", "Sports", "Community"],
                  charities: ["Partners in Health", "USO", "American Red Cross"]
                 }, './img/businesses/citysports.jpg'),
    new Business('Apple Store', 
                 {location: "815 Boylston St Boston",
                 info: "Loving it is easy. That's why so many people do",
                 donations: "Gift Cards",
                 types: ["Education", "Reading"],
                  charities: ["American Red Cross"]
                 }, "./img/businesses/apple.png"),
    new Business('REI', 
                 {location: "401 Park Dr, Boston, MA",
                 info: "From backpacking to running to staying in shape and more, outfit your winter activities with the latest gear, clothing & footwear at REI.",
                 donations: "Gift Cards",
                 types: ["Outdoors", "Community"],
                  charities: ["USO"]
                 }, "./img/businesses/rei.jpg"),
    new Business('Macy\'s', 
                 {location: "450 Washington St Boston, MA",
                 info: "Macy's has the latest fashion brands on Women's and Men's Clothing, Accessories, Jewelry, Beauty, Shoes and Home Decor!",
                 donations: "Clothing, Gift Cards",
                 types: ["Community"],
                  charities: ["Partners in Health", "American Cancer Society"]
                 }, "./img/businesses/macys.gif"),
    new Business('Chipotle', 
                 {location: "1 Brattle Square Cambridge, MA",
                 info: "Food With Integrity",
                 donations: "Food, Gift Cards",
                 types: ["Community", "Cooking"],
                  charities: ["American Cancer Society"]
                 }, "./img/businesses/chipotle.png"),
    new Business('Wendy\'s', 
                 {location: "551 Boylston St Boston, Massachusetts",
                 info: "Quality is our recipe",
                 donations: "Food, Gift Cards",
                 types: ["Community", "Cooking"],
                 charities: ["Green Laces", "Jimmy Fund"]
                 }, "./img/businesses/wendys.png"),
    new Business('Home Depot', 
                 {location: "5 Allstate Rd Boston, MA",
                 info: "Shop for all your home improvement needs",
                 donations: "General",
                 types: ["Automotive", "Outdoors", "Education"],
                 charities: ["Partners in Health", "Jimmy Fund"]
                 }, "./img/businesses/homedepot.png"),
       new Business('CVS', 
                 {location: "1426 Massachusetts Ave Cambridge, MA",
                 info: "CVS pharmacy delivers expert care, convenience and value",
                 donations: "Gift Cards, General",
                 types: ["Reading", "Education", "Community"],
                 charities: ["Partners in Health", "Green Laces"]
                 }, "./img/businesses/cvs.jpg"),
   new Business('Whole Foods', 
                 {location: "115 Prospect St Cambridge, MA",
                 info: "Let Whole Foods Market help you enjoy more time with loved ones, with less time in the kitchen.",
                 donations: "Food, General",
                 types: ["Cooking", "Education", "Community"],
                 charities: ["Partners in Health", "American Red Cross"]
                 }, "./img/businesses/wholefoods.jpg"),
   new Business('Walgreens', 
                 {location: "625 Massachusetts Ave Cambridge, MA",
                 info: "America's pharmacy serving your needs for prescriptions, health & wellness products, health information and photo services.",
                 donations: "Gift Cards, General",
                 types: ["Reading", "Education", "Community"],
                 charities: ["Jimmy Fund", "American Red Cross"]
                 }, "./img/businesses/walgreens.jpeg")
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
