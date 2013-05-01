var express = require("express");
var app = express();
var databaseURL = "mydb";
var collections = ["users", "reports"];
var fs = require("fs");
//var db = require("mongojs").connect(databaseURL, collections);
var hash = require("./password.js");


// allow app to use static content
app.use(express.static(__dirname));

// create account
// TODO make post
app.get('/register', function (req, res) {
    var username= req.query.user;
    db.users.find({username:username}, function(err, users){
        console.log(users.length);
        if (users.length === 0){
            var passwordHash = hash.hash(req.query.password);
            var user = {username: username, passwordHash: passwordHash};
            db.users.insert(user);
            res.end("User created");
        } else{
            console.log("user exists");
            res.end("user exists");
        }
    });
});


// basic login
app.get('/login', function (req, res) {
    var currUser = req.query.user;
    var password = hash.hash(req.query.password);
    console.log("Curr user: " + currUser);
    console.log("Password hash: " + password);
    res.end();
});

// Home screen
app.get('/', function (req, res) {
    fs.readFile("./home.html", function(err, html){
        if (err){
            throw err;
        } else{
            res.end(html);
        }
    });
});

// home
app.get('/home', function (req, res) {
    fs.readFile("./home.html", function(err, html){
        if (err){
            throw err;
        } else{
            res.end(html);
        }
    });
});

// Create screen
app.get('/create', function (req, res) {
    fs.readFile("./create.html", function(err, html){
        if (err){
            throw err;
        } else{
            res.end(html);
        }
    });
});

// my_events screen
app.get('/my_events', function (req, res) {
    fs.readFile("./my_events.html", function(err, html){
        if (err){
            throw err;
        } else{
            res.end(html);
        }
    });
});

// business_suggestions screen
app.get('/business_suggestions', function (req, res) {
    fs.readFile("./business_suggestions.html", function(err, html){
        if (err){
            throw err;
        } else{
            res.end(html);
        }
    });
});





app.get('/hi', function (req, res) {
    res.end("Hi, world!");   
});

app.listen(3000, function () {
    console.log('Server started at http://localhost:3000/');
});
