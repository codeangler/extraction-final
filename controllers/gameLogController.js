// Game CRUD Controller
var GameLog = require('../models/gameLogSchema');

module.exports = {
  get: function(req, res) {

    if(req.params.id){
      console.log(req.params, 'gameLogController.js')
      GameLog.find({"gameUser": req.params.id}, function(err, gamelogs){
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
    var newGameLog = new GameLog(req.body)
    console.log(req.body)
    newGameLog.save(function(err, doc) {
        if (err) { res.send(err) }
        res.send(doc)
      })
      // }
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
