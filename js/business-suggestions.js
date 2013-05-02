var message;
$(document).ready(function() {
    $("#messageRow").hide();
    $("#resize").width("99%");
    squarifyMe('.suggestionContainer');
    squarifyMe('#btnMessage');
    squarifyMe('#businessIcon');
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

    var index = 0;
    var numSuggestions = 5;
    addMode = false; // should be global

    $("#btnNext").click(function(){
        index = nextFunc(businessList, index, numSuggestions);
    });

     $("#btnPrevious").click(function(){
        index = prevFunc(businessList, index, numSuggestions);
    });
    $("#btnContact").click(function(){
        $("#messageRow").css("top", $(".navbar").height() + "px");
        $("#messageRow").show();
        $("#resize").width("70%");

        $("#btnRemove").click(function(){
            $("#recipients").text("");
            $("#messageRow").hide();
            $("#resize").width("99%");
            addMode = false;
            $("#suggestionRow").popover("destroy");
        });

        $("#btnAdd").click(function(){
            addMode = !addMode;
            if (addMode){
                if ($("suggestionRow").attr("data-original-title")!==""){
                    $("#suggestionRow").popover(
                        {placement: "top",
                         trigger: "manual",
                         content:"Click business icons to add them as recipients to your message. Click the add button again to stop adding businesses."
                        }
                    ).popover("show");
                }                    
            }else{
                $("#suggestionRow").popover("toggle");
            }
        });

        $("#btnSend").click(function(){
            addMode = false;
            $("#messageRow").animate({right: "-800px"}, function(){
                $("#recipients").text("");
                $("#messageRow").attr("style", "");
                $("#messageRow").hide();
            });
        });

        $("#btnHelp").click(function(){
            var title = "Have you answered these questions?";
            var content = "Describe your charity...\n\nDescribe the event...\n\n" +
                          "Explain the logistics...\n\nExplain how you'll use the donations...";
            if ($(this).attr("data-original-title")!==""){
                $(this).popover({title: title, content: content}).popover("show");
            }
        });

        if ($("#recipients").val() === ""){
            $("#recipients").val($("#businessName").text());
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
        if (addMode === false){
            var img = $("<img>");
            img.attr("src", $(this).attr("src"));
            img.width("100%");
            img.height("100%");

            $("#businessIcon").html(img);
            $("#businessName").html(business.name);
            var keys = Object.keys(business.info);
            for (var i = 0; i < keys.length; i ++){
                $("#business" + keys[i]).text(business.info[keys[i]]);
            }
        } else{
            $("#recipients").val($("#recipients").val() + ", " + business.name);
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

var Message = function(recipients, theme, charity, date, size, messageText){
    me = this;
    me.recipients = recipients;
    me.theme = theme;
    me.charity = charity;
    me.date = date;
    me.size = size;
    me.messageText = messageText;
};
