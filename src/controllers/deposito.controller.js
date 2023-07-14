const { Deposito } = require('../models/deposito')

class DepositoController {
    async createOneDeposito(request, response) {

        try {
            const {
                usuario_id,
                razao_social,
                cnpj,
                nome_fantasia,
                contato,
                email,
                telefone,
                celular,
                cep,
                endereco,
                numero,
                bairro,
                cidade,
                estado,
                complemento,
                latitude,
                longitude,
                status
            } = request.body;

            const data = await Deposito.create({
                usuario_id,
                razao_social,
                cnpj,
                nome_fantasia,
                contato,
                email,
                telefone,
                celular,
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