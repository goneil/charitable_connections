var CREATE_LINK = "create";
var MY_EVENTS_LINK = "my_events";

var user;
$(document).ready(function() {

    $(".dropdown-toggle").dropdown();
    $.get("./get_user", {}, function(username){
    if (username){
        $("#btnAccountText").text(username);
        user = username;
    } else{
        $("#btnAccount").click(function(){
            $(".dropdown-menu").hide();
            $(".content").toggle();
            // remove dropdown
        });
    }
    });
    $("a[href='./my_events']").click(function(){
        if (user){
            document.location.href = MY_EVENTS_LINK;
            return true;
        } else{
            $(this).popover({
                placement: "bottom",
                trigger: "manual",
                content: "You must login to view this page",
                container: "body"
            }).popover("show");
            setTimeout(function(){
                $(this).popover("destroy");
            }, 2000);
            $(".content").show();
            return false;
        }
    });


});

var loginValidate = function(){
    var error = false;
    var username = $("#loginUsername").val();
    var password = $("#loginPassword").val();
    var data = {};
    data.username = username;
    data.password = password;
    $.ajax({
        type: "post",
        url: "./login",
        data: data,
        success: function(data){
            error = $.parseJSON(data).error;
        },
        async: false
    });
    if (error){
        $("#btnSignIn").popover("destroy").popover({
            content: "Username or Password Incorrect",
            placement: "right"
        }).popover("show");
        return false;
    }
    window.location.href = window.location.href;
    return false;
};

var registerValidate= function(){
    var username = $("#createUsername").val();
    var usernameExists;
    $.ajax({
        url: "./user_exists",
        data: {username:username},
        success: function(exists){
                usernameExists = $.parseJSON(exists).exists;
        },
        async: false
    });
    if (usernameExists){
        $("#btnRegister").popover({
            content: "Sorry, this username is already taken",
            placement: "right"
        }).popover("show");
        return false;
    }
};

var toggleDropdown = function(){
    $(".dropdown-toggle").toggleClass('open');
};
