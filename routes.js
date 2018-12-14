const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./src/app/middlewares/auth')

const controllers = require('./src/app/controllers')
const validators = require('./src/app/validators')

routes.post(
  '/user',
  validate(validators.User),
  handle(controllers.UserController.store)
)
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

routes.use(authMiddleware)

/**
 * Ads
 */
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
routes.delete(
  '/ads/:id',
  validate(validators.Purchase),
  handle(controllers.AdController.destroy)
)

/**
 * Purchases
 */
routes.post('/purchases', handle(controllers.PurchaseController.store))

module.exports = routes
