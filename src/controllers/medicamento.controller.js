const { Medicamento } = require('../models/medicamento')

class MedicamentoController {
    async createOneMedicamento(request, response) {

        try {
            const {
                usuario_id,
                deposito_id,
                nome,
                laboratorio,
                descricao,
                dosagem,
                unidade_dosagem,
                tipo,
                preco_unitario,
                quantidade,

            } = request.body;

            const data = await Medicamento.create({
                usuario_id,
                deposito_id,
                nome,
                laboratorio,
                descricao,
                dosagem,
                unidade_dosagem,
                tipo,
                preco_unitario,
                quantidade,

            })

            return response.status(201).send(data)
        } catch (error) {
            return response.status(400).send(
                {
                    message: "Falha na operação de criar medicamento",
                    cause: error.message
                }
            )
        }
    }
}

module.exports = new MedicamentoController()