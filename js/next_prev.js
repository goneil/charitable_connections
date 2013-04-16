$(document).ready(function() {
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
        $("#btnNext").html("Next &rarr;");
    }
};
