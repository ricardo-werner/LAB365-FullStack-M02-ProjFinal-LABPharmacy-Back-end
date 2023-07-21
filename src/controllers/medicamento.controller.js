const { Medicamento } = require('../models/medicamento')
const { Deposito } = require('../models/deposito')
const { response } = require('express')

class MedicamentoController {
    async createOneMedicamento(request, response) {

        try {
            const {
                usuario_id,
                deposito_id,
                medicamento_nome,
                laboratorio_nome,
                medicamento_descricao,
                medicamento_dosagem,
                unidade_dosagem,
                medicamento_tipo,
                status,
                preco_unitario,
                quantidade
            } = request.body;

            const deposito = await Deposito.findByPk(deposito_id);
            if (!deposito) {
                return response.status(404).json({
                    message: "Falha na operação de criar Medicamento",
                    cause: "Depósito não encontrado"
                });
            }

            const medicamento = await Medicamento.findOne({
                where: {
                    medicamento_nome: medicamento_nome,
                    laboratorio_nome: laboratorio_nome,
                }
            })
            if (medicamento) {
                return response.status(409).json({
                    message: "Falha na operação de criar Medicamento",
                    cause: "Medicamento já cadastrado"
                });
            }

            const novoMedicamento = await Medicamento.create({
                usuario_id,
                deposito_id,
                medicamento_nome,
                laboratorio_nome,
                medicamento_descricao,
                medicamento_dosagem,
                unidade_dosagem,
                medicamento_tipo,
                status,
                preco_unitario,
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
                usuario_id,
                deposito_id,
                medicamento_nome,
                laboratorio_nome,
                medicamento_descricao,
                medicamento_dosagem,
                unidade_dosagem,
                medicamento_tipo,
                preco_unitario,
                status,
                quantidade
            } = request.body;

            const medicamento = await Medicamento.update({
                usuario_id,
                deposito_id,
                medicamento_nome,
                laboratorio_nome,
                medicamento_descricao,
                medicamento_dosagem,
                unidade_dosagem,
                medicamento_tipo,
                status,
                preco_unitario,
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