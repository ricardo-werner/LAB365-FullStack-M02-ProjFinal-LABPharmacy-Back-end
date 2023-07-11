const { createOneDeposito } = require('../controllers/deposito.controller')
const { Router } = require('express')

class DepositoRouter{
    routesFromDeposito () {
        const depositoRoutes  = Router()
        depositoRoutes.post('/createOneDeposito', createOneDeposito)
        return depositoRoutes
    }
}

module.exports = new DepositoRouter()