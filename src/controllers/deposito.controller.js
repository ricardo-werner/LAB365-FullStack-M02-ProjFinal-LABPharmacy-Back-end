const { Deposito } = require('../models/deposito')

class DepositoController {
    async createOneDeposito(request, response) {

        try {
            const {
                id,
                usuario_id,
                distribuidor_name,
                cnpj,
                contato,
                cep,
                endereco,
                bairro,
                cidade,
                estado,
                numero,
                complemento,
                latitude,
                longitude,
                status
            } = request.body;

            const data = await Deposito.create({
                id,
                usuario_id,
                distribuidor_name,
                cnpj,
                contato,
                cep,
                endereco,
                bairro,
                cidade,
                estado,
                numero,
                complemento,
                latitude,
                longitude,
                status
            })

            return response.status(201).send(data)
        } catch (error) {
            return response.status(400).send(
                {
                    message: "Falha na operação de criar deposito",
                    cause: error.message
                }
            )
        }
    }
}

module.exports = new DepositoController()