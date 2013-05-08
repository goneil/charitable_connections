var GET_BUSINESSES = "./get_businesses";
var CREATE_MESSAGE = "./create_message";

var recipients = {};

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
var eventObject;
$(document).ready(function() {
    window.onresize = function(event){
        squarifyAll();
    };
    $("#frame").hide();
    $("#messageRow").hide();
    $("#resize").width("99%");
    squarifyAll();
    var businessList = getBusinesses({eventID: $.getUrlVar("event_id")});
     $("#noResults").hide();
    if (businessList.length === 0){
        $("#noResults").show();
        $("#results").hide();
    }
    
    addMode = false; // should be global

    $("#btnNext").hover(function(){
        var hs = $(".horizontal-slide");
        hs.stop().animate({scrollLeft: hs.scrollLeft() + 100000}, 100000);
    },function(){
        $(".horizontal-slide").stop();
    });

    $("#btnPrevious").hover(function(){
        var hs = $(".horizontal-slide");
        hs.stop().animate({scrollLeft: hs.scrollLeft() -+ 100000}, 100000);
    },function(){
        $(".horizontal-slide").stop();
    });

    $("#btnContact").click(function(){
        $("#messageRow").css("top", $(".navbar").height() + "px");
        $("#messageRow").show();
        $("#resize").width("70%");
        squarifyAll();


        if (Object.keys(recipients).length === 0){
            addRecipient($("#businessName").text());
        }
            
    });
    $("#btnRemove").click(function(){
        var rows = $("tr");
        $("#messageRow").hide();
        $("#resize").width("99%");
        addMode = false;
        $("#suggestionRow").popover("destroy");
        squarifyAll();
        rows.find(".icon-remove").click();
    });


    $("#btnSend").click(function(){
        var message = {};
        message.recipients = Object.keys(recipients);
        message.from = $("#btnAccountText").text();
        message.content = $("#messageContent").val();
        message.eventID = $.getUrlVar("event_id");
        $.post(CREATE_MESSAGE, message, function(data){
            data = $.parseJSON(data);
            if (data.error){
                $(".error").text("Message failed to send, try again");
            } else{
                addMode = false;

                $("#messageRow").animate({right: "-800px"}, function(){
                    $("#messageRow").attr("style", "");
                    $("#resize").width("99%");
                    $("#suggestionRow").popover("destroy");
                    $("#messageRow").hide();
                    squarifyAll();
                    $("tr").find(".icon-remove").click();
                });
            }
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

    $.get("./get_event", {id: $.getUrlVar("event_id")}, function(data){
        data = $.parseJSON(data);
        eventObject = data;
        if (data.types !== null){
            $("#theme").val(data.types.join(", "));
        }else{
            $("#theme").val("None Specified");
        }
        if (data.charities !== null){
            $("#charities").val(data.charities.join(", "));
        } else{
            $("#charities").val("None Specified");
        }
        if (data.date !== "0"){
            $("#date").val((new Date(parseInt(data.date, 10))).toString().split(" ").slice(0, 4).join(" "));
        } else{
            $("#date").val("None Specified");
        }
        setSuggestions(businessList);
        squarifyAll();

    });
});

Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};

var setSuggestions = function(businessList){
    var i = 0;
    var matches = 0;
    while (i < businessList.length){
        var img = $('<img class="imageThumbnail thumbnail"/>');
        img.attr("src", businessList[i].imageLink);
        img.attr("index", i);
        img.width("100%");
        img.height("100%");
        var row = $("<li class='span2'>");
        row.append(img);
        var donationMatches = getDonationMatches(businessList[i]);
        if (donationMatches.length > 0 || eventObject.donations === null){
            matches ++;
            var popoverContent;
            if (donationMatches.length > 0){
                popoverContent = businessList[i].name + " matches the donation types: " + donationMatches.join(", ");
            } else{
                popoverContent = businessList[i].name + " does not match your event\'s donation types";
            }
            img.popover({placement: "top",
                             trigger: "manual",
                             content:popoverContent,
                             container: "body"
            });
            img.hover(function(){
                x = this;
                $(this).popover("show");
            },function(){
                $(this).popover("hide");
            });
            $(".horizontal-slide").append(row);
        }
        i++;
    }

    $("#matches").text(matches);
    $(".imageThumbnail").click(function(){
        $("#firstFrame").hide();
        $("#frame").show();
        squarifyAll();
        var business = businessList[$(this).attr("index")];
        if (addMode === false){
            var img = $("<img>");
            img.attr("src", $(this).attr("src"));
            img.width("100%");
            img.height("100%");

            $("#businessIcon").html(img);
            $("#businessName").html(business.name);
            $("#businesslocation").text(business.location);
            $("#businessinfo").text(business.description);
            $("#businessdonations").text(business.donations.join(", "));
        } else{
            addRecipient(business.name);
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
        url: GET_BUSINESSES,
        data: eventObject,
        success: function(data){
            businessList = $.parseJSON(data);
        },
        async: false
    });
    return businessList;

};

var squarifyAll = function(){
    squareItUp($('.suggestionContainer'));
    squareItUp($('.imageThumbnail'));
    squareItUp($('#btnMessage'));
    squareItUp($('#businessIcon'));
};

var addRecipient = function(businessName){
    if (recipients[businessName] === undefined){
        recipients[businessName] = true;

        var newRow = $("<tr>");
        newRow.attr("id", "recipient" + businessName);
        newRow.append("<td><span class='recipient'>" + businessName + "</span></td>");
        var removeIcon = $("<i class='icon-remove icon'></i>");
        removeIcon.click(function(){
            delete recipients[businessName];
            this.parentElement.parentElement.parentElement.remove();
        });
        newRow.find("span").append(removeIcon);
        $("#recipientTable tr:last").after(newRow);
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

    }
};

var getDonationMatches = function(business){
    var bDonations = business.donations;
    var eDonations = eventObject.donations;
    console.log("b: " + bDonations);
    console.log("e: " + eDonations);

    var arr = bDonations.concat(eDonations);
    var sorted_arr = arr.sort(); // You can define the comparing function here. 
                                 // JS by default uses a crappy string compare.
    var results = [];
    for (var i = 0; i < arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            results.push(sorted_arr[i]);
        }
    }
    console.log(results);
    return results;
};
