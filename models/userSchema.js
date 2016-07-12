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
  patient: {
    // role: Boolean,
    enrolledWith: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    gameTotalScore: Number,
  },
  // clinician: {
  //   role: Boolean
  // },
  role: {
    type: String,
    required: true
  },

});

var User = mongoose.model('User', userSchema) // the name 'User' will be passed to mongoDB as 'Users' 

module.exports = User;
