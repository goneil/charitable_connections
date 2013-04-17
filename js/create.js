function squarifyRatio(element,ratio) {
    squareItUp();
    window.onresize = function(element) {
        squareItUp();
    };
    function squareItUp() {
        $(element).height($(element).width()*ratio);
        $("#choicesFrame").height($("#eventFrame").height());
        $("#logistics").height($("#eventFrame").height());
        $("#map-canvas").width($("#logistics").width() - 20);
        $(".ui-datepicker-inline").width($("#logistics").width() - 40);
        $("#gmaps-canvas").css("width",$("#logistics").width() - 20);
        $("#gmaps-canvas").css("height", $("#logistics").height() - 20);
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


function makeChoiceList(list, element){
    //$("#choicesList").empty();
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
    //$("#search-box").liveUpdate(element).focus();
}

$(document).ready(function() {
    squarifyRatio('#eventFrame', 0.75);
    makeChoiceList(charities, "#charityList");
    makeChoiceList(event_types, "#eventList");
    makeChoiceList(donation_types, "#donationList");
    $("#eventList").hide();
    $("#donationList").hide();
    $("#logistics").hide();

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
                }
            }
            selected = [];
        },
        selecting: function(event, ui) {
            $currentlySelected.addClass('ui-selected');
        },
        selected: function(event, ui){
            selected.push(ui.selected);
        },
        tolerance: 'fit'
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
    if ($("#btnNext").text() === "Finish"){
        $("#btnNext").attr("href", "./business-suggestions.html");
        return;
    }else{
        $("#btnNext").removeAttr("href");
    }
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
        //$("#date").hide();
        $("#location").hide();
        $("#datepicker").datepicker();
        $("#btnDate").click();
        $(".ui-datepicker-inline").width($("#logistics").width() - 20);
        $("#gmaps-canvas").css("width",$("#logistics").width() - 20);
        $("#gmaps-canvas").css("height", $("#logistics").height() - 20);
    }
}

