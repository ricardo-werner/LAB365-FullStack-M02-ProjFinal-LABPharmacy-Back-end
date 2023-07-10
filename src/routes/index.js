const { Router } = require('express')
const { routesFromUser } = require('./user.routes')
//const { routesFromDeposit } = require('./deposits.routes')
//const { routesFromMedicines} = require('./medicines.routes')

const routes = new Router()

routes.use('/api', [
  routesFromUser(),
  //routesFromDeposit(),
  //routesFromMedicines(),
])

module.exports = routes