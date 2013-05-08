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

var myEvent = {charities:[], 
               types:[],
               donations:[],
               date:0,
               lat:0,
               lng:0,
               location:"",
               _id: $.getUrlVar("event_id")
              };

function squarifyRatio(element,ratio) {
    squareItUp();
    window.onresize = function(element) {
        squareItUp();
    };
    function squareItUp() {
        $(element).height($(element).width()*ratio);
        $("#choicesFrame").height($("#eventFrame").height());
        $("#eventTable").height($("#eventFrame").height());
        $("#loc_icon").height($("#loc_icon").width());
        $("#date_icon").height($("#date_icon").width());
        $("#loc_label").height($("#loc_icon").height());
        $("#date_label").height($("#date_icon").height());
        $("#loc_label").width($("#loc_icon").width());
        $("#date_label").width($("#date_icon").width());
        $("#logistics").height($("#eventFrame").height());
        $("#logs").height($("#logistics").height());
        $("#location").height($("#logistics").height() - ($("#date").height() + 10));
        //var mapWrapHeight = $("#logistics").height()
            //- ($("#log-navs").height() 
            //+ $("#gmaps-input-address").height()); 
        //$("#location").height(mapWrapHeight);
        //$("#gmaps-canvas").height(mapWrapHeight-45);
        $("#searchResultsDiv").height($("#eventFrame").height() - $("#search-box").height() - 20);
    }
}

var charities = [
    { label: "American Cancer Society", image: "img/acs.png" },
    { label: "American Red Cross", image: "img/red_cross.png"},
    { label: "Green Laces", image: "img/green_laces.png" },
    { label: "Jimmy Fund", image: "img/jimmy_fund.png"},
    { label: "Partners in Health", image: "img/partners.png" },
    { label: "USO", image: "img/uso.png"}
];

var event_types = [
    { label: "Automotive", image: "img/car.png" },
    { label: "Basketball", image: "img/bball.png" },
    { label: "Cooking", image: "img/cooking.png" },
    { label: "Education", image: "img/edu.png" },
    { label: "Reading", image: "img/reading.png" },
    { label: "Soccer", image: "img/soccer.png" }
];

var donation_types = [
    { label: "Beverages", image: "img/drinks.png" },
    { label: "Clothes", image: "img/clothes.png" },
    { label: "Food", image: "img/food.png" },
    { label: "General", image: "img/general.png" },
    { label: "Gift Cards", image: "img/gift_cards.png" },
    { label: "Monetary", image: "img/money.png"}
];

var charity_icons = 0;
var event_icons = 0;
var donation_icons = 0;

function makeChoiceList(list, element){
    for(var i = 0; i < list.length; i++){
        var img = new Image();
        img.src = list[i].image;
        var caption = $('<div/>')
            .html(list[i].label)
            .addClass("choice_label");
        var li = $('<li/>')
            .addClass("ui-state-default")
            .append(img)
            .append(caption);
        $(element).append(li);
    }
}

$(document).ready(function() {
    if (!$.getUrlVar("event_id")){
        window.location.href = window.location.href + "?event_id=" + $("#eventId").attr("eventId");
    }
    var location = null;
    var date = null;
    squarifyRatio('#eventFrame', 0.75);
    makeChoiceList(charities, "#charityList");
    makeChoiceList(event_types, "#eventList");
    makeChoiceList(donation_types, "#donationList");
    $("#eventList").hide();
    $("#donationList").hide();
    $("#logistics").hide();
    $("#eventTable").hide();
    $("#loc_icon").hide();
    $('#date_icon').hide();

    $("#search-box").liveUpdate($("#charityList")).focus();

    var $currentlySelected = null;
    var selected = [];

    $('.choicesList').selectable({
        start: function(event, ui){
            $currentlySelected = $('.choicesList .ui-selected');
        },
        stop: function(event, ui){
            for(var i = 0; i < selected.length; i++){
                if($.inArray(selected[i],$currentlySelected) >= 0){
                    $(selected[i]).removeClass('ui-selected');
                    removeIcon($(selected[i]).children("img").attr("src"), highlightedButton);
                }
                else{
                    var img = new Image();
                    img.src = $(selected[i]).children("img").attr("src");
                    img.name = $(selected[i]).children("div").text();
                    addIcon(img, highlightedButton);
                }
            }
            selected = [];
            if (($('.choicesList .ui-selected').length === 0) 
                && (location == null) 
                && (date ==null)){
                $("#eventTable").hide();
                $("#help_overlay").show();
            }
        },
        selecting: function(event, ui) {
            $currentlySelected.addClass('ui-selected');
        },
        selected: function(event, ui){
            $("#eventTable").show();
            $("#help_overlay").hide();
            selected.push(ui.selected);
        },
        tolerance: 'fit'
    });

    var selectLocation = function(locationString){
        var split = (locationString).split(",");
        var i = 0;
        location = split[i];
        i++;
        while((i < 2) && (i < split.length)){
            location += (", " + split[i]);
            i++;
        }
        $("#loc_label").html("Welcome to " + location);
        $('#loc_icon').show();
        $('#eventTable').show();
        $('#help_overlay').hide();

        myEvent.location = locationString;
        var address = locationString;
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode( { 'address': address}, function(results, status) {
          var location = results[0].geometry.location;
          myEvent.lat = location.lat();
          myEvent.lng = location.lng();
        });
    };

    $("#gmaps-input-address").on("autocompleteselect", function(event, ui) {
        selectLocation(ui.item.value);
    }).keyup(function(e, ui){
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code == 13) {
            selectLocation($(this).val());
        }
    });
    var highlightedButton = 0; // keeps track of which button is highlighted
    var numButtons = 4;
    //charities
    $("#btnFirst").click(function(){
        highlightedButton = 0;
        highlightButton(highlightedButton);
        $("#btnPrev").addClass("disabled");
        changeChoicesList(highlightedButton);

    });
    //event
    $("#btnSecond").click(function(){
        highlightedButton = 1;
        highlightButton(highlightedButton);
        $("#btnPrev").removeClass("disabled");
        changeChoicesList(highlightedButton);
    });
    //logistics
    $("#btnThird").click(function(){
        highlightedButton = 2;
        highlightButton(highlightedButton);
        $("#btnPrev").removeClass("disabled");
        changeChoicesList(highlightedButton);
    });
    //donations
    $("#btnFourth").click(function(){
        highlightedButton = 3;
        highlightButton(highlightedButton);
        $("#btnPrev").removeClass("disabled");
        changeChoicesList(highlightedButton);
    });
    $("#btnPrev").click(function(){
        if (highlightedButton > 0){
            highlightedButton --;
            highlightedButton = ((highlightedButton % numButtons) + numButtons) % numButtons;
            highlightButton(highlightedButton);
        }
        changeChoicesList(highlightedButton);
    });
    $("#btnNext").click(function(){
    if ($("#btnNext").text() === "Finish"){
        var url = "./add_event";
        $.ajax({
            type: "post",
            url: url,
            data: myEvent,
            success:function(data){
                data = $.parseJSON(data);
                window.location.href = "./business_suggestions?event_id=" + data.id;
                return;
            },
            async: false
        });
        return;

    }else{
        $("#btnNext").removeAttr("href");
    }

        highlightedButton ++;
        highlightedButton = ((highlightedButton % numButtons) + numButtons) % numButtons;
        highlightButton(highlightedButton);
        changeChoicesList(highlightedButton);
    });

    /*$("#btnDate").click(function(){
        $("#location").hide();
        $("#date").show();
        $($(this).parent()).addClass("active");
        $($("#btnLocation").parent()).removeClass("active");
    });
    $("#btnLocation").click(function(){
        $("#date").hide();
        $("#location").show();
        $($(this).parent()).addClass("active");
        $($("#btnDate").parent()).removeClass("active");
        gmaps_init();

    });*/

    $("#btnPrev").addClass("disabled");
});

// highlights button indexed by number.  Also takes care of previous and next
// disabling/text changing
var highlightButton = function(num){
    var progressBar = $("#progressBar");
    var children = progressBar.children();
    num = ((num % children.length) + children.length) % children.length;

    // move progressindicator
    for (var i = 0; i < children.length; i ++){
        if (i === num){
            $(children[i]).addClass("btn-warning").addClass("active");
        }else{
            $(children[i]).removeClass("btn-warning").removeClass("active");
        }
    }

    // enable or disable prev button
    if (num === 0){
        $("#btnPrev").addClass("disabled");
    }else{
        $("#btnPrev").removeClass("disabled");
    }

    // change text of next button to finish at end
    if (num === 3){
        $("#btnNext").html("Finish");
    }else{
        $("#btnNext").html("Next ►");
    }
};

// changes contents of choice list based on button number
function changeChoicesList(btnNum){
    if(btnNum === 0){
        //makeChoiceList(charities);
        $("#choicesTitle").html("Select your charity");
        $("#choicesFrame").show();
        $("#charityList").show();
        $("#eventList").hide();
        $("#logistics").hide();
        $("#donationList").hide();
        $("#search-box").liveUpdate($("#charityList")).focus();

    }
    else if(btnNum === 2){
        //makeChoiceList(event_types);
        $("#choicesTitle").html("Select your event types");
        $("#choicesFrame").show();
        $("#charityList").hide();
        $("#logistics").hide();
        $("#eventList").show();
        $("#donationList").hide();
        $("#search-box").liveUpdate($("#eventList")).focus();
    }
    else if(btnNum === 3){
        //makeChoiceList(donation_types);
        $("#choicesTitle").html("Select desired donation types");
        $("#choicesFrame").show();
        $("#charityList").hide();
        $("#eventList").hide();
        $("#logistics").hide();
        $("#donationList").show();
        $("#search-box").liveUpdate($("#donationList")).focus();
    }
    else if(btnNum === 1){
        gmaps_init();
        $("#gmaps-canvas").height("340px");
        var inputWidth = $("#gmaps-input-address").width();
        console.log($("#logs").width());
        console.log($(inputWidth));
        $("#gmaps-input-address").css("left",($("#logistics").width() - (inputWidth + 15))/2 );
        $("#choicesTitle").html("Indicate date and location");
        $("#choicesFrame").hide();
        $("#logistics").show();
        //$("#location").hide();
        $("#datepicker").datepicker({
            showOn: "both",
            buttonImage: "img/calendar.gif",
            buttonImageOnly: true,
            onSelect: function(dateText, inst){
                console.log(inst);
                console.log($("#datepicker").datepicker("getDate"));
                date = dateText.replace(",", "").split(" ");
                var display = date[0] + '<br/>' + date[1] + '<br/>' + date[2];
                $("#date_label").html(display);
                $("#help_overlay").hide();
                $("#eventTable").show();
                $("#date_icon").show();
                var unix = (new Date(dateText)).getTime();
                myEvent.date = unix;
            },
            dateFormat: "M d, yy",
            minDate: +1,
            maxDate: "+1Y"
        });
        $("#btnDate").click();
        /*var mapHeight = $("#logistics").height()
            - ($("#log-navs").height() 
            + $("#gmaps-input-address").height());  
        $("#location").height(mapHeight);
        $("#gmaps-canvas").height(mapHeight-45);*/
        //$("#gmaps-canvas").css("width",$("#logistics").width() - 20);
        //$("#gmaps-canvas").css("height", $("#location").height() - 20);
    }
}

function addIcon(img, pane){
    if(pane === 0){
        charity_icons++;
        $(img).addClass('charity_icon');
        $('#charity_icons').append(img);
        changeWidth(charity_icons, '.charity_icon');
        myEvent.charities.push(img.name);
    } 
    if(pane === 2){
        event_icons++;
        $(img).addClass('event_icon');
        $('#event_icons').append(img);
        changeWidth(event_icons, '.event_icon');
        myEvent.types.push(img.name);
    }
    if(pane === 3){
        donation_icons++;
        $(img).addClass('donation_icon');
        $('#donation_icons').append(img);
        changeWidth(donation_icons, '.donation_icon');
        myEvent.donations.push(img.name);
    }
}

function removeIcon(src, pane){
    var icons;
    if(pane === 0){
        charity_icons--;
        icons = $("#charity_icons").children();
        for(var i = 0; i < icons.length; i++){
            if($(icons[i]).attr('src') == src){
                $(icons[i]).remove();
                remove(myEvent.charities, icons[i].name);
            }
        }
        changeWidth(charity_icons, '.charity_icon');
    }
    if(pane === 2){
        event_icons--;
        icons = $("#event_icons").children();
        for(var i = 0; i < icons.length; i++){
            if($(icons[i]).attr('src') == src){
                $(icons[i]).remove();
                remove(myEvent.types, icons[i].name);
            }
        }
        changeWidth(event_icons, '.event_icon');
    }
    if(pane === 3){
        donation_icons--;
        icons = $("#donation_icons").children();
        for(var i = 0; i < icons.length; i++){
            if($(icons[i]).attr('src') == src){
                $(icons[i]).remove();
                remove(myEvent.donations, icons[i].name);
            }
        }
        changeWidth(donation_icons, '.donation_icon');
    }
}

function changeWidth(count, elem){
    if(count === 1){
            $(elem).css('width', (60/count)+'%');
        }
        else if(count <= 3){
            $(elem).css('width', (70/count)+'%');
        }
        else{
            $(elem).css('width', (70/3)+'%');
        }
}

// found at http://stackoverflow.com/questions/9792927/javascript-array-search-and-remove-string
function remove(arr, what) {
    console.log(what);
    var found = arr.indexOf(what);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
}
