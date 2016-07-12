var mongoose = require('mongoose');

var gameLogSchema = mongoose.Schema({
  gameName : String,
  gameComplete : Boolean,
  gameDate : String,
  gameUser : {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  initialSud : Number,
  finalSud : Number,
  perChangeSud : Number,

});

var GameLog = mongoose.model('GameLog', gameLogSchema);
module.export = GameLog;