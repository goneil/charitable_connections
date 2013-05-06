// from http://basethe.me/theming-tips/squarifying-bootstrap-spans
function squareItUp(element) {
    $(element).height($(element).width());
}

function squarifyMe(element) {
    squareItUp(element);
    window.onresize = function(element) {
        squareItUp(element);
    };
}

