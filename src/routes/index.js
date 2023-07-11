const { Router } = require('express')
const { routesFromUsuario } = require('./usuario.routes')
const { routesFromDeposito } = require('./deposito.routes')
//const { routesFromRemedio} = require('./remedio.routes')

const routes = new Router()

routes.use('/api', [
  routesFromUsuario(),
  routesFromDeposito(),
  //routesFromRemedio(),
])

module.exports = routes