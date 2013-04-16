
$(document).ready(function() {
    squarifyMe('.suggestionContainer');
    squarifyMe('#btnMessage');
    squarifyMe('#businessIcon');
    squarifyMe('#frame');
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
        if ($("#messageRow").length === 0){
            $(".container").append('<div id="messageRow" class="row maximizedMessage"  >\
                <div class="span4" id="messageHeader">\
                    <div class="row">\
                        <div class="span3 recipients">\
                                    To:\
                                    <div id="recipientsContainer">\
                                    <input id="recipients" type="text" placeholder="recipients...">\
                                        <i class="icon-plus-sign icon" id="btnAdd"></i>\
                                    </div>\
                        </div>\
                        <div class="span1" id="icons">\
                            <i class="icon-plus icon-white icon" id="btnMaximize"></i>\
                            <i class="icon-minus icon-white icon" id="btnMinimize"></i>\
                            <i class="icon-remove icon-white icon" id="btnRemove"></i>\
                        </div>\
                    </div>\
                </div>\
                <div id="messageBody">\
                    <form class="form-horizontal">\
                      <div class="control-group">\
                        </br>\
                        <label class="control-label" for="theme">Theme</label>\
                        <div class="controls">\
                          <input type="text" id="theme" placeholder="Theme">\
                        </div>\
                      </div>\
                      <div class="control-group">\
                        <label class="control-label" for="charity">Charity</label>\
                        <div class="controls">\
                          <input type="text" id="charity" placeholder="Charity">\
                        </div>\
                      </div>\
                      <div class="control-group">\
                        <label class="control-label" for="date">Date</label>\
                        <div class="controls">\
                          <input type="text" id="date" placeholder="xx/xx/xxxx">\
                        </div>\
                      </div>\
                      <div class="control-group">\
                        <label class="control-label" for="size">Size</label>\
                        <div class="controls">\
                          <input type="text" id="size" placeholder="Size">\
                        </div>\
                      </div>\
                      <div class="control-group">\
                        <label class="control-label" for="messageToBusiness">Message To Business (recommended)</label>\
                        <i class="icon-question-sign icon" id="btnHelp"></i>\
                        <div class="controls">\
                            <textarea rows="5"></textarea>\
                        </div>\
                      </div>\
                      <div class="control-group">\
                        <div class="controls">\
                          <button type="button" id="btnSend" class="btn btn-primary">Send</button>\
                        </div>\
                      </div>\
                    </form>\
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
                $("#messageRow").remove();
                addMode = false;
                $("#suggestionRow").popover("destroy");
            });
            $("#btnAdd").click(function(){
                addMode = !addMode;
                if (addMode){
                    $("#btnMinimize").click();
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
                $("#messageRow").remove();
                alert("Send not implemented");
            });
            $("#btnHelp").click(function(){
                var title = "Have you answered these questions?";
                var content = "Describe your charity...\n\nDescribe the event...\n\n" +
                              "Explain the logistics...\n\nExplain how you'll use the donations...";
                if ($(this).attr("data-original-title")!==""){
                    $(this).popover({title: title, content: content}).popover("show");
                }
            });
        } else{
            $("#btnMaximize").click();
        }
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
