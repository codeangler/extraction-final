// Users - both Therapist and Clients 
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  patient: {
    role: Boolean,
    enrolledWith: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    gameTotalScore: Number,
  },
  clinician: {
    role: Boolean
  },
  role: String

});

var User = mongoose.model('User', userSchema) // the name 'User' will be passed to mongoDB as 'Users' 

module.exports = User;
