const { Medicamento } = require('../models/medicamento')

class MedicamentoController {
    async createOneMedicamento(request, response) {

        try {
            const {
                usuario_id,
                deposito_id,
                nome_medicamento,
                nome_laboratorio,
                descricao_medicamento,
                dosagem_medicamento,
                unidade_dosagem,
                tipo_medicamento,
                status,
                preco_unitario,
                quantidade
            } = request.body;

            const data = await Medicamento.create({
                usuario_id,
                deposito_id,
                nome_medicamento,
                nome_laboratorio,
                descricao_medicamento,
                dosagem_medicamento,
                unidade_dosagem,
                tipo_medicamento,
                status,
                preco_unitario,
                quantidade
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

    async listAllMedicamentos(request, response) {
        try {
            const data = await Medicamento.findAll()
            return response.status(200).send(data)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de listar medicamentos",
                cause: error.message
            })
        }
    }

    async listOneMedicamento(request, response) {
        try {
            const { id } = request.params
            const data = await Medicamento.findOne({
                where: { id: id }
            })
            return response.status(200).send(data)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de listar medicamento",
                cause: error.message
            })
        }
    }

    async updateOneMedicamento(request, response) {
        try {
            const { id } = request.params
            const {
                usuario_id,
                deposito_id,
                nome_medicamento,
                nome_laboratorio,
                descricao_medicamento,
                dosagem_medicamento,
                unidade_dosagem,
                tipo_medicamento,
                preco_unitario,
                quantidade
            } = request.body;

            const data = await Medicamento.update({
                usuario_id,
                deposito_id,
                nome_medicamento,
                nome_laboratorio,
                descricao_medicamento,
                dosagem_medicamento,
                unidade_dosagem,
                tipo_medicamento,
                preco_unitario,
                quantidade
            }, {
                where: { id: id }
            })

            return response.status(200).send(data)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de atualizar o medicamento",
                cause: error.message
            })
        }
    }

    async deleteOneMedicamento(req, res) {
        const { id } = req.params;

        // Buscar o usuário pelo identificador
        const user = await Medicamento.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Medicamento não encontrado' });
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

        return res.status(200).json(user);
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = new MedicamentoController()