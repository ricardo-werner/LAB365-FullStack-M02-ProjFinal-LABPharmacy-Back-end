const { Medicamento } = require('../models/medicamento')

class MedicamentoController {
    async createOneMedicamento(request, response) {

        try {
            const {
                
            } = request.body;

            const data = await Medicamento.create({
                
            })

            return response.status(201).send(data)
        } catch (error) {
            return response.status(400).send(
                {
                    message: "Falha na operação de criar medeicamento",
                    cause: error.message
                }
            )
        }
    }
}

module.exports = new MedicamentoController()