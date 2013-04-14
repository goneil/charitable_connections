// from http://basethe.me/theming-tips/squarifying-bootstrap-spans
function squarifyMe(element) {
    squareItUp();
    window.onresize = function(element) {
        squareItUp();
    };
    function squareItUp() {
        $(element).height($(element).width());
    }
}
