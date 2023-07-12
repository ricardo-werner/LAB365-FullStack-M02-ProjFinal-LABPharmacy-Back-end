const { createOneMedicamento } = require('../controllers/medicamento.controller')
const { Router } = require('express')

class MedicamentoRouter{
    routesFromMedicamento () {
        const medicamentoRoutes  = Router()
        medicamentoRoutes.post('/createOneMedicamento', createOneMedicamento)
        return medicamentoRoutes
    }
}

module.exports = new MedicamentoRouter()