// Users - both Therapist and Clients 
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  phoneNumber: String,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  enrolledWith:[String], 
  gameTotalScore: Number, 
  role: {
    type: String,
    required: true
  },

});

var User = mongoose.model('User', userSchema) // the name 'User' will be passed to mongoDB as 'Users' 

module.exports = User;
