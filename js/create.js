function squarifyMe(element,ratio) {
    squareItUp();
    window.onresize = function(element) {
        squareItUp();
    };
    function squareItUp() {
        $(element).height($(element).width()*ratio);
    }
    $("#choicesFrame").height($("#eventFrame").height());
}

var charities = [
	{ label: "American Cancer Society", image: "img/acs.png" },
	{ label: "American Red Cross", image: "img/red_cross.png"},
	{ label: "Green Laces", image: "img/green_laces.png" },
	{ label: "Jimmy Fund", image: "img/jimmy_fund.png"},
	{ label: "Partners in Health", image: "img/partners.png" },
	{ label: "USO", image: "img/uso.png"}
];

var charity_list = []


function makeChoiceList(list){
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
		$("#choicesList").append(li);
	}
}

$(document).ready(function() {
    squarifyMe('#eventFrame', .75);
    makeChoiceList(charities);


    /*$("#choicesFrame").bind('mousewheel DOMMouseScroll', function(e){
    	var scrollTo = null;

    	if(e.type == 'mousewheel'){
			scrollTo = (e.originalEvent.wheelDelta * -1);
		}
		else if(e.type == 'DOMMouseScroll'){
			scrollTo = 40*e.originalEvent.detail;
		}

		if(scrollTo) {
			e.preventDefault();
			$(this).scrollTop(scrollTo + $(this).scrollTop());
		}
    });*/


	var $currentlySelected = null;
	var selected = [];

	$('#choicesList').selectable({
		start: function(event, ui){
			$currentlySelected = $('#choicesList .ui-selected');
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
    $("#btnFirst").click(function(){
        highlightedButton = 0;
        highlightButton(highlightedButton);
        $("#btnPrev").addClass("disabled");
        //TODO implement function
    });
    $("#btnSecond").click(function(){
        highlightedButton = 1;
        highlightButton(highlightedButton);
        $("#btnPrev").removeClass("disabled");
        //TODO implement function
    });
    $("#btnThird").click(function(){
        highlightedButton = 2;
        highlightButton(highlightedButton);
        $("#btnPrev").removeClass("disabled");
        //TODO implement function
    });
    $("#btnFourth").click(function(){
        highlightedButton = 3;
        highlightButton(highlightedButton);
        $("#btnPrev").removeClass("disabled");
        //TODO implement function
    });
    $("#btnPrev").click(function(){
        if (highlightedButton > 0){
            highlightedButton --;
            highlightedButton = ((highlightedButton % numButtons) + numButtons) % numButtons;
            highlightButton(highlightedButton);
        }
        //TODO implement functionality
    });
    $("#btnNext").click(function(){
        highlightedButton ++;
        highlightedButton = ((highlightedButton % numButtons) + numButtons) % numButtons;
        highlightButton(highlightedButton);
        //TODO implement functionality
    });

    $("#btnPrev").addClass("disabled");
});


// highlilghts button indexed by number.  Also takes care of previous and next
// disabling/text changing
var highlightButton = function(num){
    var progressBar = $("#progressBar");
    var children = progressBar.children();
    console.log(children.length);
    num = ((num % children.length) + children.length) % children.length;
    console.log(num);

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
