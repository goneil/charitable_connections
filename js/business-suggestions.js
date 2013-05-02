//This script extracts parameters from the URL
//from jquery-howto.blogspot.com
$.extend({
    getUrlVars : function() {
        var vars = [], hash;
        var hashes = window.location.href.slice(
                window.location.href.indexOf('?') + 1).split('&');
        for ( var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar : function(name) {
        return $.getUrlVars()[name];
    }
});


var message;
$(document).ready(function() {
    $("#messageRow").hide();
    $("#resize").width("99%");
    squarifyMe('.suggestionContainer');
    squarifyMe('#btnMessage');
    squarifyMe('#businessIcon');
    var businessList = getBusinesses();
    
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



var Message = function(recipients, theme, charity, date, size, messageText){
    me = this;
    me.recipients = recipients;
    me.theme = theme;
    me.charity = charity;
    me.date = date;
    me.size = size;
    me.messageText = messageText;
};

var getBusinesses = function(eventObject){
    var businessList;
    $.ajax({
        type: "get",
        url: "./get_businesses",
        data: eventObject,
        success: function(data){
            businessList = $.parseJSON(data);
            console.log(businessList);
        },
        async: false
    });
    return businessList;

};
