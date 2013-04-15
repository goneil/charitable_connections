
$(document).ready(function() {
    squarifyMe('.suggestionContainer');
    squarifyMe('#btnMessage');
    squarifyMe('#businessIcon');
    squarifyMe('#frame');
    var businessList = [
        new Business('Trader Joe\'s',
                     {info:"Trader Joes info",
                      donations: "Food Baskets"
                     }, './img/businesses/traderjoes.png'),
        new Business('Cambridge Bicycle',
                     {info:"Cambridge bike info",
                      donations: "Bicycles"
                     }, './img/businesses/cambridgebicycle.png'),
        new Business('Qdoba',
                     {info:"Qdoba info",
                      donations: "Food"
                     }, './img/businesses/qdoba.jpg'),
        new Business('Shaw\'s',
                     {info:"Shaws info",
                      donations: "Food, Cookware, Beverages, Gift Certificates"
                     }, './img/businesses/shaws.gif'),
        new Business('Eastern Mountain Sports',
                     {info:"ems info",
                      donations: "Gift Certificates"
                     }, './img/businesses/easternmountainsports.gif'),
        new Business('McDonald\'s',
                     {info:"McDonald's info",
                      donations: "Food, Gift Certificates"
                     }, './img/businesses/mcdonalds.png'),
        new Business('City Sports',
                     {info:"City Sports info",
                      donations: "Gift Certificates"
                     }, './img/businesses/citysports.jpg')
    ];

    var index = 0;
    var numSuggestions = 5;

    $("#btnNext").click(function(){
        index = nextFunc(businessList, index, numSuggestions);
    });

     $("#btnPrevious").click(function(){
        index = prevFunc(businessList, index, numSuggestions);
    });
    $("#btnContact").click(function(){
        if ($("#messageRow").length === 0){
            $(".container").append('<div id="messageRow" class="row maximizedMessage"  >\
                <div class="span3" id="messageHeader">\
                    <div class="row">\
                        <div class="span2">\
                            MessageTitle\
                        </div>\
                        <div class="span1" id="icons">\
                            <i class="icon-plus icon-white" id="btnMaximize"></i>\
                            <i class="icon-minus icon-white" id="btnMinimize"></i>\
                            <i class="icon-remove icon-white" id="btnRemove"></i>\
                        </div>\
                    </div>\
                </div>\
                <div id="messageBody">\
                    lsdkjflsdkjf\
                </div>\
            </div>\
            ');
            $("#btnMaximize").click(function(){
                if ($(this).is(":visible")){
                    $("#messageRow").removeClass("minimizedMessage").addClass("maximizedMessage");
                    $(this).hide();
                    $("#btnMinimize").show();
                    $("#messageBody").show();
                }
            }).hide();
            $("#btnMinimize").click(function(){
                $("#messageRow").removeClass("maximizedMessage").addClass("minimizedMessage");
                $(this).hide();
                $("#btnMaximize").show();
                $("#messageBody").hide();
            });
            $("#btnRemove").click(function(){
                console.log("remove clicked");
                $("#messageRow").remove();
            });
        } else{
            $("#btnMaximize").click();
        }
            
    });

   

    setSuggestions(businessList, index, numSuggestions);
    $("[index='2']").click();
});

var nextFunc = function(businessList, index, numSuggestions){
    setSuggestions(businessList, index + 1, numSuggestions);
    return index + 1;
};

var prevFunc = function(businessList, index, numSuggestions){
    setSuggestions(businessList, index - 1, numSuggestions);
    return index - 1;
};

Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};

var setSuggestions = function(businessList, index, numSuggestions){
    if (!numSuggestions){
        numSuggestions = 5;
    }
    var i = 0;
    while (i < numSuggestions){
        var j = (i + index).mod(businessList.length);
        var img = $('<input type="image" class="imageThumbnail thumbnail">');
        img.attr("src", businessList[j].imageLink);
        img.attr("index", j);
        img.width("100%");
        img.height("100%");
        $("#suggestion" + i).html(img);
        i ++;
    }

    $(".imageThumbnail").click(function(){
        var business = businessList[$(this).attr("index")];
        var img = $("<img>");
        img.attr("src", $(this).attr("src"));
        img.width("100%");
        img.height("100%");

        $("#businessIcon").html(img);
        $("#businessName").html(business.name);
        var keys = Object.keys(business.info);
        for (var i = 0; i < keys.length; i ++){
            $("#business" + keys[i]).html(business.info[keys[i]]);
        }
    });
};


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
