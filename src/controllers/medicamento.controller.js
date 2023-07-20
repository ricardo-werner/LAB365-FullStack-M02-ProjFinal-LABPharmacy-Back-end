const { Medicamento } = require('../models/medicamento')
const { Deposito } = require('../models/deposito')
const { response } = require('express')

class MedicamentoController {
    async createOneMedicamento(request, response) {

        try {
            const {
                usuarioid,
                depositoid,
                medicamentonome,
                laboratorionome,
                medicamentodescricao,
                medicamentodosagem,
                unidadedosagem,
                medicamentotipo,
                status,
                precounitario,
                quantidade
            } = request.body;

            const deposito = await Deposito.findByPk(deposito_id);
            if (!deposito) {
                return response.status(404).json({
                    message: "Falha na operação de criar Medicamento",
                    cause: "Depósito não encontrado"
                });
            }

            const novoMedicamento = await Medicamento.create({
                usuarioid,
                depositoid,
                medicamentonome,
                laboratorionome,
                medicamentodescricao,
                medicamentodosagem,
                unidadedosagem,
                medicamentotipo,
                status,
                precounitario,
                quantidade
            })

            return response.status(201).send(novoMedicamento)
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de criar Depósito",
                cause: message
            });
        }
    }

    async listAllMedicamentos(request, response) {
        try {
            const medicamento = await Medicamento.findAll()
            return response.status(200).send(medicamento)
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de criar Depósito",
                cause: message
            });
        }
    }

    async listOneMedicamento(request, response) {
        try {
            const { id } = request.params
            const medicamento = await Medicamento.findOne({
                where: { id: id }
            })
            return response.status(200).send(medicamento)
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de criar Depósito",
                cause: message
            });
        }
    }

    async updateOneMedicamento(request, response) {
        try {
            const { id } = request.params
            const {
                usuarioid,
                depositoid,
                medicamentonome,
                laboratorionome,
                medicamentodescricao,
                medicamentodosagem,
                unidadedosagem,
                medicamentotipo,
                precounitario,
                status,
                quantidade
            } = request.body;

            const medicamento = await Medicamento.update({
                usuarioid,
                depositoid,
                medicamentonome,
                laboratorionome,
                medicamentodescricao,
                medicamentodosagem,
                unidadedosagem,
                medicamentotipo,
                status,
                precounitario,
                quantidade
            }, {
                where: { id: id }
            })

            return response.status(200).send(medicamento)
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de criar Depósito",
                cause: message
            });
        }
    }

    async deleteOneMedicamento(req, res) {
        const { id } = req.params;

        // Buscar o usuário pelo identificador
        const medicamento = await Medicamento.findByPk(id);
        if (!medicamento) {
            return res.status(404).json({ error: 'Medicamento não encontrado' });
        }

        // Atualizar o campo de status e delete_at
        if (medicamento.status === 'ativo') {
            medicamento.status = 'inativo';
            medicamento.deleted_at = new Date();
            console.log(user.deleted_at)
        } else if (medicamento.status === 'inativo') {
            medicamento.status = 'ativo';
            medicamento.deleted_at = null;
        }

        // Salvar a alteração no banco de dados
        await medicamento.save();

        return res.status(200).json(medicamento);
    } catch(error) {
        const status = error.message.status || 400
        const message = error.message.msg || error.message
        return response.status(parseInt(status)).send({
            message: "Falha na operação de criar Depósito",
            cause: message
        });
    }
}

module.exports = new MedicamentoController()