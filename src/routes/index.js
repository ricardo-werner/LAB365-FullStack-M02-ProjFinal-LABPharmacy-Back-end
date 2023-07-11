const { Router } = require('express')
const { routesFromUsuario } = require('./usuario.routes')
//const { routesFromDeposit } = require('./deposits.routes')
//const { routesFromMedicines} = require('./medicines.routes')

const routes = new Router()

routes.use('/api', [
  routesFromUsuario(),
  //routesFromDeposit(),
  //routesFromMedicines(),
])

module.exports = routes