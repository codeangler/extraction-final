// server.js
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var apiRoutes = require('./api_routes')
//  Connect to Database
mongoose.connect('mongodb://localhost/extraction_db', function(err){
  if(err){console.log("Error connecting to db")}
    if(!err){console.log('You have connected to  mongodb')}
})

// Create Express App Object
var app = express();

// Application Config
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', function(req, res){
  res.sendFile('/index.html', {root : './public'})
});

app.use('/api/v1', apiRoutes)

var port = process.env.PORT || 3260
app.listen(port, function(){
  console.log('Node Server is Listening on port: ' + port);
});
