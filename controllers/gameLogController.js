(function() { // Game CRUD Controller
  var GameLog = require('../models/gameLogSchema');

  module.exports = {
    get: function(req, res) {

      if (req.params.id) {
        GameLog.find({ "gameUser": req.params.id }, function(err, gamelogs) {
          // console.log(gamelogs, 'gameLogController.js')
          res.send(gamelogs)
        })
      } else {
        GameLog.find({}, function(err, gamelogs) {
          if (err) { res.send(err) } else { res.send(gamelogs) }
        })
      }
    },

    upsert: function(req, res) {

      // Check for user object , if true save to DB
      if (req.user) {
        console.log(req.user._id, "req.user")
          // user is Logged in and has completed the mission
        if (req.body._id) {
          var id = req.body._id
          console.log('findByIdAndUpdate', req.body)

          GameLog.findByIdAndUpdate(id, req.body, { upsert: true, 'new': true }, function(err, doc) {
              if (err) { res.send(err) }
              res.send(doc)
            }) // else create a new log for partial complete missions assigned to user
        } else {
          // append to the req.body the property of gameUser and a value of ._id
          req.body.gameUser = req.user._id
          var upsertGameLog = new GameLog(req.body)
            // console.log('you should be attaching me to session object, sucker')
          upsertGameLog.save(function(err, doc) {
            if (err) { res.send(err) }
            console.log('upsertGameLog.save response:', doc)
            res.send(doc)
          })
        }
      } else { // Store on req.session.object for gameuser not logged in
        // var upsertGameLog = new GameLog(req.body)
        if (req.body._id) {
          var id = req.body._id
          console.log('findByIdAndUpdate', req.body)
          res.send('yo man you are great')

        } else {  // Store incomplete game and return _id to frontend
          req.session.upsertGameLog = new GameLog(req.body)
            // console.log('no post to db, simply attaced to session', req.body)
          console.log('req.body', req.body, 'req.session', req.session)
          res.send(req.session)
        }

      }


    },

    delete: function(req, res) {
      var id = req.params.id;

      GameLog.findByIdAndRemove(id, req.body, function(error) {
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
}());
