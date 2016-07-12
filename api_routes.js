var
  gameLogCtrl = require('./controllers/gameLogController.js'),
  userCtrl = require('./controllers/userController.js'),
  apiRouter = require('express').Router()

//  User Routes
  apiRouter.route('/users')
    .get(userCtrl.get)
    .post(userCtrl.upsert)


  apiRouter.route('/users/:id')
    .get(userCtrl.get)
    .post(userCtrl.upsert)
    .delete(userCtrl.delete)


module.exports = apiRouter