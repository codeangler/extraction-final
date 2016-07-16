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
      // console.log('controllers/gameLogController.js', req.body)
      // if (req.params.id) {
      //   GameLog.update({ _id: req.params.id }, req.body, function(err, updated) {
      //     if (err) {
      //       return res.send(err)
      //     }
      //   })
      // } else {
      // Set a variable to accept the req.body
      if (req.body.gameComplete === true) {
        var id = req.body._id
        console.log("this is the mongoose controler _id", id)
        GameLog.findByIdAndUpdate(id, req.body, { upsert: true,'new': true }, function(err, doc) {
          if (err) { res.send(err) }
          console.log('find and update gameLogController.js', doc)
          res.send(doc)
        })
        console.log('hey this file exists, gameLogController.npm', req.body)

      } else {
        var upsertGameLog = new GameLog(req.body)

        upsertGameLog.save(function(err, doc) {
          if (err) { res.send(err) }
          console.log('file created, return new id', doc)
          res.send(doc)
        })

      }

    },

    // delete: function(req, res) {
    //   var id = req.params.id;

    //   GameLog.findByIdAndRemove(id, req.body, function(error) {
    //     if (error) {
    //       console.error("Your remove call failed : ", error)
    //     } else {
    //       res.json({
    //         success: true,
    //         message: "Deleted donute by id: " + id
    //       })
    //     }
    //   })
    // }
  }
}());
