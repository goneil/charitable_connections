function squarifyMe(element) {
    squareItUp();
    window.onresize = function(element) {
        squareItUp();
    };
    function squareItUp() {
        $(element).height($(element).width());
    }
}

$(document).ready(function() {
    squarifyMe('#eventFrame');
});
