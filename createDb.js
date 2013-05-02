var databaseURL = "mydb";
var collections = ["users", "businesses", "messages", "events"];
var db = require("mongojs").connect(databaseURL, collections);

/**
 * Class Business represents different business selections
 * @param {string} name: business name
 * @param {object} info: information object (to be setup later)
 * @param {string} imageLink
 */
var Business = function(name, info, imageLink){
    me = this;
    me.name = name;
    me.info = info;
    me.imageLink = imageLink;
};

var businessList = [
    new Business('Trader Joe\'s',
                 {location: "748 Memorial Dr Cambridge (617) 491-8582",
                  info:"Profiles specialty retail grocery store in nine states: California, Arizona, Nevada, Oregon, Washington, Massachusetts, New York, Connecticut, and New Jersey.",
                  donations: "Food Baskets"
                 }, './img/businesses/traderjoes.png'),
    new Business('Cambridge Bicycle',
                 {location: "259 Massachusetts Ave  Cambridge, MA 02139 (617) 876-6555",
                  info:"DigThis Boston's Best Bike Shop. BMX, comfort bike, fixed gear, folding bike, hybrid bike, MTB, single speed, track bike.",
                  donations: "Bicycles"
                 }, './img/businesses/cambridgebicycle.png'),
    new Business('Qdoba',
                 {location: "1290 Massachusetts Ave  Cambridge, MA 02138 (617) 871-1136",
                  info:"What will you find at your local Qdoba Mexican Grill? Food for people who love food.",
                  donations: "Food"
                 }, './img/businesses/qdoba.jpg'),
    new Business('Shaw\'s',
                 {location: "20 Sidney St Cambridge (617) 494-5250",
                  info:"Corporate overview of retail grocery chain, associate newsletter, career opportunities, promotions, weekly specials, and store locator.",
                  donations: "Food, Cookware, Beverages, Gift Certificates"
                 }, './img/businesses/shaws.gif'),
    new Business('Eastern Mountain Sports',
                 {locadtion: "1 Brattle Square #2  Cambridge, MA 02138 (617) 864-2061",
                  info:"Outdoor gear and equipment for sports and adventure.",
                  donations: "Gift Certificates"
                 }, './img/businesses/easternmountainsports.gif'),
    new Business('McDonald\'s',
                 {location: "463 Massachusetts Ave Cambridge (617) 497-3926",
                  info:"McDonald's in the USA: Food and nutrition info, franchise opportunities, job and career info, restaurant locations, promotional information, history, innovation",
                  donations: "Food, Gift Certificates"
                 }, './img/businesses/mcdonalds.png'),
    new Business('City Sports',
                 {location: "   44 Brattle St  Cambridge, MA 02138 (617) 492-6000",
                  info:"City Sports offers the latest in athletic performance apparel, shoes, and accessories. Shop online to find top brand names and everything you need",
                  donations: "Gift Certificates"
                 }, './img/businesses/citysports.jpg')
];

for (var i = 0; i < businessList.length; i ++){
    db.businesses.insert(businessList[i], function(err, inserted){
        if (err){
            throw err;
        }
        console.log("Inserted: " + inserted[0].name);
    });
}

