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
                    message: "Falha na operação de criar Deposito",
                    cause: error.message
                }
            )
        }
    }

    async listAllDepositos(request, response) {
        try {
            const data = await Deposito.findAll()
            return response.status(200).send(data)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de listar Depositos",
                cause: error.message
            })
        }
    }

    async listOneDeposito(request, response) {
        try {
            const { id } = request.params
            const data = await Deposito.findOne({
                where: { id: id }
            })
            return response.status(200).send(data)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de listar Deposito",
                cause: error.message
            })
        }
    }

    async updateOneDeposito(request, response) {
        try {
            const { id } = request.params
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

            const data = await Deposito.update({
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
            }, {
                where: { id: id }
            })

            return response.status(200).send(data)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de atualizar o Deposito",
                cause: error.message
            })
        }
    }

    async deleteOneDeposito(request, response) {
        const { id } = request.params;

        // Buscar o usuário pelo identificador
        const user = await Deposito.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Deposito não encontrado' });
        }

        // Atualizar o campo de status e delete_at
        if (user.status === 'ativo') {
            user.status = 'inativo';
            user.deleted_at = new Date();
            console.log(user.deleted_at)
        } else if (user.status === 'inativo') {
            user.status = 'ativo';
            user.deleted_at = null;
        }

        // Salvar a alteração no banco de dados
        await user.save();

        return response.status(200).json(user);
    } catch(error) {
        return response.status(400).json({ error: error.message });
    }
}

module.exports = new DepositoController()