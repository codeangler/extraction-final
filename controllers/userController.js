// User CRUD Controller
var User = require('../models/userSchema')
var bcrypt = require('bcryptjs')

module.exports = {
  get: function(req, res) {
    var callBackString = {}
    if (req.params.id) {
      User.findOne({ _id: req.params.id }, function(err, user) {
        callBackString.user = user
          // Test response User for role of "clinician"
        if (user.role === 'clinician') {
          // Search db for all documents that have a 
          User.find({ enrolledWith: { $in: [user.username] } }, function(err, patients) {
            callBackString.patients = patients
            res.send(callBackString)
            console.log(callBackString, 'controllers/userController')
          })
        } else{
          callBackString.user = user;
          res.send(callBackString)
        }
      })
    } else {
      User.find({}, function(err, users) {
        callBackString.users
        res.send(callBackString)
      })
    }
  },

  upsert: function(req, res) {
    // console.log('controllers/userController.js', req.body)
    if (req.params.id) {
      User.update({ _id: req.params.id }, req.body, function(err, updated) {
        if (err) {
          return res.send(err)
        }
      })
    } else {
      bcrypt.genSalt(11, function(error, salt) {
        bcrypt.hash(req.body.password, salt, function(hashError, hash) {
          req.body.password = hash
          var newUser = new User(req.body);
          newUser.save(function(saveErr, user) {
            if (saveErr) { res.send({ err: saveErr }) } else {
              req.login(user, function(loginErr) {
                if (loginErr) { res.send({ err: loginErr }) } else { res.send({ success: 'success', user: user }) }
              })
            }
          })

        })
      })
    }
  },

  delete: function(req, res) {
    var id = req.params.id;

    User.findByIdAndRemove(id, req.body, function(error) {
      if (error) {
        console.error("Your remove call failed : ", error)
      } else {
        res.json({
          success: true,
          message: "Deleted donute by id: " + id
        })
      }
    })
  }
}
