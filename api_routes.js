var
  gameLogCtrl = require('./controllers/gameLogController.js'),
  userCtrl = require('./controllers/userController.js'),
  apiRouter = require('express').Router()

function isSignedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  } else {
    return res.send("No Access")
    
  }
}

//  User Routes
  apiRouter.route('/users')
    .get(isSignedIn, userCtrl.get)
    .post(userCtrl.upsert)

  apiRouter.route('/users/:id')
    .get(userCtrl.get) // isSignedIn in blocks refresh.  isSignedIn removed
    .post(userCtrl.upsert)
    .delete(userCtrl.delete)

  apiRouter.route('/gamelogs')
    .get(gameLogCtrl.get)
    .post(gameLogCtrl.upsert)

  apiRouter.route('/gamelogs/:id')
    .get(gameLogCtrl.get)

module.exports = apiRouter