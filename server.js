// server.js
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var apiRoutes = require('./api_routes')
var port =  3260

// Create Express App Object
var app = express();

//  Connect to Database
mongoose.connect('mongodb://localhost/extraction_db', function(err){
  if(err){console.log("Error connecting to db")}
    if(!err){console.log('You have connected to  mongodb')}
})
var User = require('./models/userSchema') // Captures the model that is exported from userSchema.js

/** Express Session Setup **/
var session = require('express-session')
app.sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
})
app.use(app.sessionMiddleware)
/** End Express Session Setup **/


// Application Config
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


/** Passport Config **/
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// When someone tries to log in to our site, how do we determine that they are who they say they are?
var bcrypt = require('bcryptjs')
passport.use(new LocalStrategy(
    // write local strategy here
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false); // No error and no user
            }
            // If we got this far, then we know that the user exists. But did they put in the right password?
            bcrypt.compare(password, user.password, function(error, matched){
                if (matched === true){
                    return done(null,user) // No error and this is the user they should be signed in as
                }
                else {
                    return done(null, false) // Passwords didn't match no error and no user
                }
            })
        });
    }
));

app.isAuthenticated = function(req, res, next){
    // If the current user is logged in, allow them through
    // else, kick them out to the login page.
     if(req.isAuthenticated()){
    // Middleware allows the execution chain to continue.
        return next();
    }
    // If not, redirect to login
    console.log('get outta here!')
    res.redirect('/');

}

app.isAuthenticatedAjax = function(req, res, next){
    // If the current user is logged in...
    if(req.isAuthenticated()){
    // Middleware allows the execution chain to continue.
        return next();
    }
    // If not, redirect to login
    res.send({error:'not logged in'});
}

app.isUser = function (req, res, next){
    if(req.isAuthenticated() && req.user.id == req.params.id){
        return next()
    }
    res.redirect('/')

}

app.post('/login', function(req, res, next){
    // use your local strategy here.
    console.log('app.post in server.js')
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send({error : 'something went wrong :('}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({success:'success', user: user});
        });
    })(req, res, next);
})

// app.get('/api/me',
//   passport.authenticate('basic', { session: false }),
//   function(req, res) {
//     res.json(req.user);
//   });

// Logout
app.get('/logout', function(req, res){
    req.logout()
    res.redirect('/')
})

// Routes
app.get('/', function(req, res){
  res.sendFile('/index.html', {root : './public'})
});

app.get('/dashboard', app.isAuthenticated, app.isUser, function(req, res){

})

app.use('/api/v1', apiRoutes)

// Node Server Listening
app.listen(port, function(){
  console.log('Node Server is Listening on port: ' + port);
});
