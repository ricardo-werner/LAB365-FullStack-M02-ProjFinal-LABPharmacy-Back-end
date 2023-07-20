const { Deposito } = require('../models/deposito')
const { response } = require('express')

class DepositoController {
    // async createOneDeposito(request, response) {

    //     try {
    //         const {
    //             usuario_id,
    //             razao_social,
    //             cnpj,
    //             nome_fantasia,
    //             contato,
    //             email,
    //             telefone,
    //             celular,
    //             cep,
    //             endereco,
    //             numero,
    //             bairro,
    //             cidade,
    //             estado,
    //             complemento,
    //             latitude,
    //             longitude,
    //             status
    //         } = request.body;

    //         console.log(request.body);

    //         const existeDeposito = await Deposito.findOne({
    //             where: { razao_social: razao_social, cnpj: cnpj }
    //         });
    //         if (existeDeposito) {
    //             return response.status(409).send({
    //                 message: "Falha na operação ao criar depósito",
    //                 cause: "CNPJ já existe"
    //             });
    //         }

    //         const novoDeposito = await Deposito.create({
    //             usuario_id,
    //             razao_social,
    //             cnpj,
    //             nome_fantasia,
    //             contato,
    //             email,
    //             telefone,
    //             celular,
    //             cep,
    //             endereco,
    //             bairro,
    //             cidade,
    //             estado,
    //             numero,
    //             complemento,
    //             latitude,
    //             longitude,
    //             status
    //         })

    //         return response.status(201).send(novoDeposito)
    //     } catch (error) {
    //         return response.status(400).send({
    //                 message: "Falha na operação de criar Deposito",
    //                 cause: error.message
    //             }
    //         )
    //     }
    // }

    async createOneDeposito(request, response) {
        try {
            const {
                usuario_id,
                razao_social,
                cnpj,
                nome_fantasia,
                email,
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

            const novoDeposito = await Deposito.create({
                usuario_id,
                razao_social,
                cnpj,
                nome_fantasia,
                email,
                celular,
                cep,
                numero,
                bairro,
                cidade,
                estado,
                complemento,
                latitude,
                longitude,
                status
            });

            return response.status(201).send(novoDeposito);
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de criar Depósito",
                cause: message
            });
        }
    }

    async listAllDepositos(request, response) {
        try {
            const deposito = await Deposito.findAll()
            return response.status(200).send(deposito)
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
            const deposito = await Deposito.findOne(id);

            if (!deposito) {
                return response.status(404).send({
                    message: "Falha na operação de listar Deposito",
                    cause: "Deposito não encontrado"
                })
            }
            return response.status(200).send(deposito)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de listar Deposito",
                cause: error.message
            })
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
                bairro,
                cidade,
                estado,
                complemento,
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
                !bairro &&
                !cidade &&
                !estado &&
                !complemento &&
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

            return response.status(204).send(
                { message: "Deposito atualizado com sucesso" }
            );

        } catch (error) {
            return response.status(404).send({
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