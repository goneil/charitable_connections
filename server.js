var express = require("express");
var app = express();
var databaseURL = "mydb";
var collections = ["users", "businesses", "messages", "events"];
var fs = require("fs");
var db = require("mongojs").connect(databaseURL, collections);
var hash = require("./password.js");

// proposed DATABASE STRUCTURE: 
// there are several "tables" in the database
//
// Table: users
// each user is an object: {username: "uname", passwordHash: "pwhash"}
//
// Table: businesses
// business object: 
// { name: "name",
//   info: {},
//   imageLink: "href"
// }
//
// Table: event
// { owner: "username",
//   charities: ["list", "of", "charity names"],
//   type: "event type",
//   date: "event date",
//   location: "event location string (maybe lat and lng would be good",
//   donations: ["list", "of", "donation types"],
//   isCurrent: bool,
// }
//
// Table: Messages
// { from: "username",
//   to: "username",
//   content: "string",
//   date: "date",
//   event: "event __id"
//   prev: "reply to message id"
// }

// allow app to use static content
app.use(express["static"](__dirname));
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

app.post("/create_message", function(req, res){
    var from , recipients, content, eventID, prev;
    from = req.body.from;
    recipients = req.body.recipients;
    content = req.body.content;
    eventID = req.body.eventID;
    prev = null;

    for (var i = 0; i < recipients.length; i ++){
        var to = recipients[i];
        var message = {
            from: from,
            to: to,
            content: content,
            eventID: eventID,
            prev: prev
        };
        db.messages.insert(message, function(err, inserted){
            if (err){
                res.end(JSON.stringify({error: true}));
                throw err;
            }
            res.end(JSON.stringify({error: false}));
        });
    }
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


// returns list of businesses matching event
// pass eventID through request
app.get("/get_businesses", function(req, res){
    var eventID = req.query.eventID;
    var myEvent;

    db.events.find({_id:eventID}, function(err, eventCursor){
        if (err){
            throw err;
        }
        myEvent = eventCursor[0];
    });

    var businessList = [];
    db.businesses.find({}, function(err, businessCursor){
        for (var i = 0; i < businessCursor.length; i ++){
            businessList.push(businessCursor[i]);
        }
        res.end(JSON.stringify(businessList));
    });

});

app.post("/add_event", function(req, res){
    var myEvent = req.body;
    var currentUser = req.session.username;
    if(currentUser){
        myEvent.user = currentUser;
    }
    db.events.insert(myEvent, function(err, inserted){
        if (err){
            throw err;
        }
        var data = JSON.stringify({id: inserted[0]._id});
        res.end(data);
    });

});

app.listen(3000, function () {
    console.log('Server started at http://localhost:3000/');
});
