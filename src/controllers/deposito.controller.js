const { Deposito } = require('../models/deposito')
const { response } = require('express')
const { config } = require('dotenv')
config()

class DepositoController {
    async createOneDeposito(request, response) {
        try {
            const {
                usuario_id,
                razao_social,
                cnpj,
                nome_fantasia,
                email,
                telefone,
                celular,
                cep,
                endereco,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                latitude,
                longitude,
                status
            } = request.body;

            // Verifica se o deposito já existe
            const depositoExistente = await Deposito.findOne({
                where: {
                    cnpj: cnpj
                }
            });

            if (depositoExistente) {
                return response.status(409).send({
                    message: "Falha na operação de criar depósito",
                    cause: "Depósito já existe"
                });
            }

            const novoDeposito = await Deposito.create({
                usuario_id,
                razao_social,
                cnpj,
                nome_fantasia,
                email,
                telefone,
                celular,
                cep,
                endereco,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                latitude,
                longitude,
                status
            });

            return response.status(201).send(novoDeposito);
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de criar depósito",
                cause: message
            });
            console.log(error)
        }
    }

    async listAllDepositos(request, response) {
        try {
            const deposito = await Deposito.findAll()

            return response.status(200).send(deposito)
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de listar os depósitos",
                cause: message
            });
        }
    }

    async listOneDeposito(request, response) {
        try {
            const { id } = request.params
            const deposito = await Deposito.findByPk(id);

            if (!deposito) {
                return response.status(404).send({
                    message: "Falha na operação de listar depósito",
                    cause: "Depósito não encontrado"
                })
            }

            return response.status(200).send(deposito)
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de listar depósito",
                cause: message
            });
        }
    }

    async updateOneDeposito(request, response) {
        try {
            const { id } = request.params;
            const {
                nome_fantasia,
                contato,
                email,
                telefone,
                celular,
                cep,
                endereco,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                latitude,
                longitude
            } = request.body;

            const deposito = await Deposito.findByPk(id);

            if (!id) {
                return response.status(404).send({
                    message: "Falha na operação de atualizar Deposito",
                    cause: "Deposito não encontrado"
                })
            }

            // Verifica se pelo menos um campo está presente na requisição para permitir a atualização
            if (!nome_fantasia &&
                !contato &&
                !email &&
                !telefone &&
                !celular &&
                !cep &&
                !endereco &&
                !numero &&
                !complemento &&
                !bairro &&
                !cidade &&
                !estado &&
                !latitude &&
                !longitude) {

                return response.status(400).send({
                    message: "Falha na operação de atualizar Deposito",
                    cause: "Nenhum campo para atualizar foi fornecido"
                });
            }

            // Atualiza apenas os campos fornecidos na requisição
            if (nome_fantasia !== undefined) {
                deposito.nome_fantasia = nome_fantasia;
            }
            if (contato !== undefined) {
                deposito.contato = contato;
            }
            if (email !== undefined) {
                deposito.email = email;
            }
            if (telefone !== undefined) {
                deposito.telefone = telefone;
            }
            if (celular !== undefined) {
                deposito.celular = celular;
            }
            if (cep !== undefined) {
                deposito.cep = cep;
            }
            if (endereco !== undefined) {
                deposito.endereco = endereco;
            }
            if (numero !== undefined) {
                deposito.numero = numero;
            }
            if (bairro !== undefined) {
                deposito.bairro = bairro;
            }
            if (cidade !== undefined) {
                deposito.cidade = cidade;
            }
            if (estado !== undefined) {
                deposito.estado = estado;
            }
            if (complemento !== undefined) {
                deposito.complemento = complemento;
            }
            if (latitude !== undefined) {
                deposito.latitude = latitude;
            }
            if (longitude !== undefined) {
                deposito.longitude = longitude;
            };

            // Salva as alterações no banco de dados
            await deposito.save();

            return response.status(204).send(deposito);
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de atualizar Depósito",
                cause: message
            });
        }
    }

    //Definir o endpoint para alterar o status do depósito
    async updateOneDepositoStatus(request, response) {
        try {
            const { id } = request.params;
            const { status } = request.body;

            const deposito = await Deposito.findByPk(id);
            if (!deposito) {
                return response.status(404).send({
                    message: "Falha na operação de atualizar status do depósito",
                    cause: "Depósito não encontrado"
                });
            }

            if (status !== 'ativo' && status !== 'inativo') {
                return response.status(404).send({
                    message: "Falha na operação de atualizar status do depósito",
                    cause: "Status do depósito não encontrado"
                });
            }

            await Deposito.update({ status }, { where: { id } });

            // Recuperar o depósito atualizado para retornar na resposta
            const depositoAtualizado = await Deposito.findByPk(id);

            return response.status(204).send(depositoAtualizado)
        } catch (error) {
            const status = error.message.status || 400;
            const message = error.message.msg || error.message;
            return response.status(parseInt(status)).send({
                message: "Falha na operação de atualizar status",
                cause: message
            });
        }
    }

    //Definir o endpoint para deletar Depósito (deleção lógica)
    async deleteOneDeposito(require, response) {
        try {
            const { id } = require.params;

            // Verifica se o depósito existe
            const deposito = await Deposito.findByPk(id, { paranoid: true });
            if (!deposito) {
                return response.status(404).send({ error: 'Depósito não encontrado' });
            }

            // Verifica se o depósito já está inativo
            if (deposito.status !== 'inativo') {
                return response.status(400).send({
                    message: "Falha na operação de deletar depósito",
                    cause: "O depósito deve estar com status inativo para ser deletado"
                });
            }

            // Verifica se existe medicamentos associado ao depósito
            const medicamentos = await Medicamento.findAll({
                where: { deposito_id: id }
            });

            if (medicamentos.length > 0) {
                return response.status(400).send({
                    message: "Falha na operação de deletar depósito",
                    cause: "Existem medicamentos associados ao depósito"
                });
            }

            // Realiza o Soft Delete
            await deposito.destroy();

            return response.status(204).send(deposito);
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de deletar despósito",
                cause: message
            });
        }
    }

    //Definir o endpoint para restaurar usuário (restauração lógica)
    async restoreOneDeposito(require, response) {
        try {
            const { id } = require.params;

            const deposito = await Deposito.findByPk(id, { paranoid: false });
            if (!deposito) {
                return response.status(404).send({ error: 'Depósito não encontrado' });
            }

            await deposito.restore(); // Realiza o Soft Delete
            deposito.status = 'ativo';
            await deposito.save();

            return response.status(200).send(deposito);
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de restaurar depósito",
                cause: message
            });
        }
    }
}

module.exports = new DepositoController()