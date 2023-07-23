const { Medicamento } = require('../models/medicamento')
const { Deposito } = require('../models/deposito')
const { Usuario } = require('../models/usuario')
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
                return response.status(404).send({
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
                return response.status(409).send({
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
                message: "Falha na operação de listar Medicamentos",
                cause: message
            });
        }
    }

    async listOneMedicamento(request, response) {
        try {
            const { id } = request.params
            const medicamento = await Medicamento.findByPk(id);

            if (!medicamento) {
                return response.status(404).send({
                    message: "Falha na operação de listar medicamento",
                    cause: "Medicamento não encontrado"
                });
            }

            return response.status(200).send(medicamento)
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de listar Medicamento",
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
                message: "Falha na operação de atualizar Medicamento",
                cause: message
            });
        }
    }

    // Atualizar o status do medicamento
    async updateOneMedicamentoStatus(request, response) {
        try {
            const { id } = request.params;
            const { status } = request.body;

            const medicamento = await Medicamento.findByPk(id);
            if (!medicamento) {
                return response.status(404).send({
                    message: "Falha na operação de atualizar status do medicamento",
                    cause: "Medicamento não encontrado"
                });
            }

            if (status !== 'disponivel' && status !== 'indisponivel') {
                return response.status(404).send({
                    message: "Falha na operação de atualizar status do medicamento",
                    cause: "Status do medicamento não encontrado"
                });
            }

            await Medicamento.update({ status }, { where: { id } });

            // Recuperar o usuário atualizado para retornar na resposta
            const medicamentoAtualizado = await Medicamento.findByPk(id);

            return response.status(200).send(medicamentoAtualizado);
        } catch (error) {
            const status = error.message.status || 400;
            const message = error.message.msg || error.message;
            return response.status(parseInt(status)).send({
                message: "Falha na operação de atualizar status do medicamento",
                cause: message
            });
        }
    }

    async deleteOneMedicamento(require, response) {
        try {
            const { id } = require.params;

            const medicamento = await Medicamento.findByPk(id, { paranoid: true });
            if (!medicamento) {
                return response.status(404).send({ error: 'Medicamento não encontrado' });
            }

            if (medicamento.status === 'disponivel') {
                medicamento.status = 'indisponivel';
                await medicamento.destroy(); // Realiza o Soft Delete
            }

            return response.status(204).send(medicamento);
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de deletar medicamento",
                cause: message
            });
        }
    }

    //Definir o endpoint para restaurar usuário (retauração lógica)
    async restoreOneMedicamento(require, response) {
        try {
            const { id } = require.params;

            const medicamento = await Medicamento.findByPk(id, { paranoid: false });
            if (!medicamento) {
                return response.status(404).send({ error: 'Medicamento não encontrado' });
            }

            await medicamento.restore(); // Realiza o Soft Delete
            medicamento.status = 'disponivel';
            await medicamento.save();

            return response.status(200).send(medicamento);
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de restaurar medicamento",
                cause: message
            });
        }
    }
}

module.exports = new MedicamentoController()