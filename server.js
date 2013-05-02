var express = require("express");
var app = express();
var databaseURL = "mydb";
var collections = ["users", "reports"];
var fs = require("fs");
var db = require("mongojs").connect(databaseURL, collections);
var hash = require("./password.js");


// allow app to use static content
app.use(express.static(__dirname));
// parse forms
app.use(express.bodyParser());
// store cookies
app.use(express.cookieParser("mashthekeyboard"));
app.use(express.cookieSession());

app.get("/get_user", function(req, res){
    res.end(req.session.username);
});

app.get("/user_exists", function(req, res){
    var username = req.query.username;
    console.log(username);
    db.users.find({username:username}, function(err, users){
        if (err){
            throw err;
        }
        if (users.length > 0){
            res.end(JSON.stringify({exists:true}));
        } else{
            res.end(JSON.stringify({exists:false}));
        }
    });
});

// create account
// TODO make post
app.post('/register', function (req, res) {
    var username= req.body.username;
    db.users.find({username:username}, function(err, users){
        if (users.length === 0){
            var passwordHash = hash.hash(req.body.password);
            var user = {username: username, passwordHash: passwordHash};
            db.users.insert(user, function(err, inserted){
                if (err){
                    throw err;
                }
            });
            req.session.username = username;
            res.redirect('/home');
        } else{
            res.end("user exists");
        }
    });
});

app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    db.users.find({username:username}, function(err, users){
        if (err){
            throw err;
        }
        if (users.length > 0 && hash.validate(users[0].passwordHash, password)){
            req.session.username = username;
            res.end(JSON.stringify({error:false}));
        } else{
            res.end(JSON.stringify({error:true}));
        }
    });
});

app.get('/logout', function (req, res) {
  delete req.session.username;
  res.redirect('/home');
}); 

// Home screen
app.get('/', function (req, res) {
    res.redirect("/home");
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
