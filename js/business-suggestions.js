
$(document).ready(function() {
    squarifyMe('.suggestionContainer');
    squarifyMe('#btnMessage');
    squarifyMe('#businessIcon');
    squarifyMe('#frame');
    var businessList = [
        new Business('Trader Joe\'s', {}, './img/businesses/traderjoes.png'),
        new Business('Cambridge Bicycle', {}, './img/businesses/cambridgebicycle.png'),
        new Business('Qdoba', {}, './img/businesses/qdoba.jpg'),
        new Business('Shaw\'s', {}, './img/businesses/shaws.gif'),
        new Business('Eastern Mountain Sports', {}, './img/businesses/easternmountainsports.gif'),
        new Business('McDonald\'s', {}, './img/businesses/mcdonalds.png'),
        new Business('City Sports', {}, './img/businesses/citysports.jpg')
    ];

    for (var i = 0; i < 5; i ++){
        var img = $("<img>");
        img.attr("src", businessList[i].imageLink);
        img.width("100%");
        img.height("100%");
        $("#suggestion" + i).append(img);
    }
   
});

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
