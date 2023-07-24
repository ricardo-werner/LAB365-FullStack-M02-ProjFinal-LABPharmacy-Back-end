const {
    createOneDeposito,
    listAllDepositos,
    listAllDepositosStatus,
    listOneDeposito,
    updateOneDeposito,
    updateOneDepositoStatus,
    deleteOneDeposito,
    restoreOneDeposito
} = require('../controllers/deposito.controller')
const { Router } = require('express')
const { auth } = require('../middleware/auth')

class DepositoRouter {
    routesFromDeposito() {
        const depositoRoutes = Router()
        depositoRoutes.post('/createOneDeposito', auth, createOneDeposito)
        depositoRoutes.get('/listAllDepositos', auth, listAllDepositos)
        depositoRoutes.get('/listAllDepositosStatus/:status', auth, listAllDepositosStatus)
        depositoRoutes.get('/listOneDeposito/:id', auth, listOneDeposito)
        depositoRoutes.patch('/updateOneDeposito/:id', auth, updateOneDeposito)
        depositoRoutes.patch('/updateOneDepositoStatus/:id/status', auth, updateOneDepositoStatus)
        depositoRoutes.delete('/deleteOneDeposito/:id', auth, deleteOneDeposito)
        depositoRoutes.patch('/restoreOneDeposito/:id', auth, restoreOneDeposito)
        return depositoRoutes
    }
}

module.exports = new DepositoRouter()