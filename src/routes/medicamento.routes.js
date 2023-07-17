const {
    createOneMedicamento,
    listAllMedicamentos,
    listOneMedicamento,
    updateOneMedicamento,
    deleteOneMedicamento
} = require('../controllers/medicamento.controller')
const { Router } = require('express')
const { auth } = require('../middleware/auth')

class MedicamentoRouter {
    routesFromMedicamento() {
        const medicamentoRoutes = Router()
        medicamentoRoutes.post('/createOneMedicamento', auth, createOneMedicamento)
        medicamentoRoutes.get('/listAllMedicamentos', auth, listAllMedicamentos)
        medicamentoRoutes.get('/listOneMedicamento/:id', auth, listOneMedicamento)
        medicamentoRoutes.patch('/updateOneMedicamento/:id', auth, updateOneMedicamento)
        medicamentoRoutes.delete('/deleteOneMedicamento/:id', auth, deleteOneMedicamento)
        return medicamentoRoutes
    }
}
module.exports = new MedicamentoRouter()