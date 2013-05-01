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
        var mapWrapHeight = $("#logistics").height()
            - ($("#log-navs").height() 
            + $("#gmaps-input-address").height()); 
        $("#location").height(mapWrapHeight);
        $("#gmaps-canvas").height(mapWrapHeight-45);
        $("#searchResultsDiv").height($("#eventFrame").height() - $("#search-box").height() - 15);
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

    $("#gmaps-input-address").on("autocompleteselect", function(event, ui) {
        var split = (ui.item.value).split(",");
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
        $("#btnNext").attr("href", "./business-suggestions.html");
        return;
    }else{
        $("#btnNext").removeAttr("href");
    }

        highlightedButton ++;
        highlightedButton = ((highlightedButton % numButtons) + numButtons) % numButtons;
        highlightButton(highlightedButton);
        changeChoicesList(highlightedButton);
    });

    $("#btnDate").click(function(){
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

    });

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
        $("#choicesTitle").html("Choose your charity");
        $("#choicesFrame").show();
        $("#charityList").show();
        $("#eventList").hide();
        $("#logistics").hide();
        $("#donationList").hide();
        $("#search-box").liveUpdate($("#charityList")).focus();

    }
    else if(btnNum === 1){
        //makeChoiceList(event_types);
        $("#choicesTitle").html("Choose your event types");
        $("#choicesFrame").show();
        $("#charityList").hide();
        $("#logistics").hide();
        $("#eventList").show();
        $("#donationList").hide();
        $("#search-box").liveUpdate($("#eventList")).focus();
    }
    else if(btnNum === 3){
        //makeChoiceList(donation_types);
        $("#choicesTitle").html("Choose your donation types");
        $("#choicesFrame").show();
        $("#charityList").hide();
        $("#eventList").hide();
        $("#logistics").hide();
        $("#donationList").show();
        $("#search-box").liveUpdate($("#donationList")).focus();
    }
    else if(btnNum === 2){
        $("#choicesTitle").html("Choose date and location");
        $("#choicesFrame").hide();
        $("#logistics").show();
        $("#location").hide();
        $("#datepicker").datepicker({
            onSelect: function(dateText, inst){
                date = dateText.split(" ");
                var display = date[0] + '<br/>' + date[1] + '<br/>' + date[2];
                $("#date_label").html(display);
                $("#help_overlay").hide();
                $("#eventTable").show();
                $("#date_icon").show();
            },
            dateFormat: "M d yy",
            minDate: +1,
            maxDate: "+1Y"
        });
        $("#btnDate").click();
        var mapHeight = $("#logistics").height()
            - ($("#log-navs").height() 
            + $("#gmaps-input-address").height());  
        $("#location").height(mapHeight);
        $("#gmaps-canvas").height(mapHeight-45);
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
    } 
    if(pane === 1){
        event_icons++;
        $(img).addClass('event_icon');
        $('#event_icons').append(img);
        changeWidth(event_icons, '.event_icon');
    }
    if(pane === 3){
        donation_icons++;
        $(img).addClass('donation_icon');
        $('#donation_icons').append(img);
        changeWidth(donation_icons, '.donation_icon');
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
            }
        }
        changeWidth(charity_icons, '.charity_icon');
    }
    if(pane === 1){
        event_icons--;
        icons = $("#event_icons").children();
        for(var i = 0; i < icons.length; i++){
            if($(icons[i]).attr('src') == src){
                $(icons[i]).remove();
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

