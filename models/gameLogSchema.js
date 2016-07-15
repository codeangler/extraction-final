var mongoose = require('mongoose');

var gameLogSchema = mongoose.Schema({
  gameName : String,
  gameComplete : Boolean,
  gameDate : Number,
  gameEndDate: Number,
  gameUser : {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  initialSud : Number,
  finalSud : Number,
  perChangeSud : Number,

});

var GameLog = mongoose.model('GameLog', gameLogSchema);
module.exports = GameLog;