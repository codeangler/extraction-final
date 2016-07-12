// User CRUD Controller
var User = require('../models/userSchema')

module.exports = {
  get : function (req, res){
    if (req.params.id) {
      User.findOne({_id : req.params.id}, function(err, user){
        res.send(user)
      })
    } else {
      User.find({}, function(err, users){
        res.send(users)
      })
    }
  },

  upsert : function(req, res){
    console.log(req.body)
    if(req.params.id){
      User.update({_id : req.params.id}, req.body, function(err, updated){
        if(err){
          return res.send(err)
        }
      })
    } else {
      var newUser = new User(req.body)
      console.log(newUser)
      newUser.save(function(err, doc){
        res.send(doc)
      })
    }
  },

  delete : function(req, res){
    var id = req.params.id;

      User.findByIdAndRemove(id, req.body, function(error){
        if(error){
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
