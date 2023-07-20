const { Usuario } = require('../models/usuario')
const { senha } = require('../models/usuario')
const { SECRET_KEY_JWT } = require('../config/database.config')
const { config } = require('dotenv')
const { sign } = require('jsonwebtoken')
const { response } = require('express')
config()
class UsuarioController {
    async createOneUsuario(request, response) {
        try {
            const {
                nome,
                sobrenome,
                genero,
                datanascimento,
                cpf,
                telefone,
                email,
                senha,
                status
            } = request.body;

            const novoUsuario = await Usuario.create({
                nome,
                sobrenome,
                genero,
                datanascimento,
                cpf,
                telefone,
                email,
                senha,
                status
            });

            return response.status(201).send(novoUsuario);
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de criar Depósito",
                cause: message
            });
        }
    }


    async loginUsuario(request, response) {
        try {
            const {
                email,
                senha
            } = request.body;

            //console.log(request.body)

            const usuario = await Usuario.findOne({
                where: { email: email }
            })

            if (!usuario) {
                return response.status(404).send({
                    message: "Tentativa de Login Falhou",
                    cause: "E-mail não encontrado"
                });
            }

            if (usuario.senha !== senha) {
                return response.status(400).send({
                    message: "Tentativa de Login Falhou",
                    cause: "Senha inválida"
                });
            }

            console.log(usuario)

            const payload = { "email": usuario.email, "senha": usuario.senha }
            const token = sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: '1d' })
            console.log(token)
            console.log("Senha Igual")
            return response.status(200).send({ "token": token })

        } catch (error) {
            return response.status(500).send({
                message: "Falha na tentativa de Login",
                cause: "Erro interno do servidor"
            })
        }
    }

    async listAllUsuarios(request, response) {
        try {
            const usuario = await Usuario.findAll()
            return response.status(200).send(usuario)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de listar usuários",
                cause: "Usuários não encontrados"
            })
        }
    }

    async listOneUsuario(request, response) {
        try {
            const { id } = request.params;
            const usuario = await Usuario.findByPk(id, {
                attributes: { exclude: ['senha'] }
            });

            if (!usuario) {
                return response.status(404).send({
                    message: "Falha na operação de listar usuário",
                    cause: "Usuário não encontrado"
                });
            }

            return response.status(200).send(usuario);
        } catch (error) {
            return response.status(400).send({
                message: "Erro ao listar usuário",
                cause: error.message
            });
        }
    }

    async updateOneUsuario(request, response) {
        try {
            const { id } = request.params;
            const {
                nome,
                sobrenome,
                genero,
                telefone
            } = request.body;

            const usuario = await Usuario.findByPk(id);

            if (!usuario) {
                return response.status(404).send({
                    message: "Falha na operação de atualizar usuário",
                    cause: "Usuário não encontrado"
                });
            }

            // Verifica se pelo menos um campo está presente na requisição para permitir a atualização
            if (!nome && !sobrenome && !genero && !telefone) {
                return response.status(400).send({
                    message: "Falha na operação de atualizar usuário",
                    cause: "Nenhum campo para atualizar foi fornecido"
                });
            }

            // Atualiza apenas os campos fornecidos na requisição
            if (nome !== undefined) {
                usuario.nome = nome;
            }
            if (sobrenome !== undefined) {
                usuario.sobrenome = sobrenome;
            }
            if (genero !== undefined) {
                usuario.genero = genero;
            }
            if (telefone !== undefined) {
                usuario.telefone = telefone;
            }

            // Salva as alterações no banco de dados
            await usuario.save();

            return response.status(202).send(
                { message: "Usuário atualizado com sucesso" }
            );

        } catch (error) {
            return response.status(401).send({
                message: "Falha ao atualizar no banco de dados",
                cause: error.message // Retorna a mensagem de erro específica
            });
        }
    }


    async updateOneStatus(request, response) {
        try {
            const { id } = request.params;
            const {
                status
            } = request.body;

            if (!usuario) {
                return response.status(404).send({
                    message: "Falha na operação de atualizar status",
                    cause: "Usuário não encontrado"
                })
            }

            if (status != 'ativo' && status != 'inativo') {
                return response.status(404).send({
                    message: "Falha na operação de atualizar status",
                    cause: "Status não encontrado"
                })
            }

            const usuario = await Usuario.update(id, {
                status
            })

            return response.status(200).send(usuario)
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de criar Depósito",
                cause: message
            });
        }
    }

    async updateOneSenha(request, response) {
        try {
            const { id } = request.params;
            const {
                senha
            } = request.body;

            if (!usuario) {
                return response.status(404).send({
                    message: "Falha na operação de atualizar status",
                    cause: "Usuário não encontrado"
                })
            }

            const usuario = await senha.update({
                senha
            }, {
                where: { id: id, senha: senha }
            })

            return response.status(200).send(usuario)
        } catch (error) {
            const status = error.message.status || 400
            const message = error.message.msg || error.message
            return response.status(parseInt(status)).send({
                message: "Falha na operação de criar Depósito",
                cause: message
            });
        }
    }
    // Definir o endpoint para deletar usuário (deleção física)
    //
    // async deleteOneUsuario(request, response) {
    //     try {
    //         const { id } = request.params
    //         const usuario = await usuario.destroy({
    //             where: { id: id }
    //         })
    //         return response.status(200).send(usuario)
    //     } catch (error) {
    //         return response.status(400).send({
    //             message: "Falha na operação de deletar usuário",
    //             cause: error.message
    //         })
    //     }
    // }

    // Definir o endpoint para atualizar o status de um usuário (deleção lógica)
    async deleteOneUsuario(require, response) {
        const { id } = require.params;

        const usuario = await Usuario.findByPk(id, { paranoid: false });
        if (!usuario) {
            return response.status(404).json({ error: 'Usuário não encontrado' });
        }

        if (usuario.status === 'ativo') {
            usuario.status = 'inativo';
            await usuario.destroy(); // Realiza o Soft Delete
        } else if (usuario.status === 'inativo') {
            usuario.status = 'ativo';
            usuario.deleted_at = null;
            await usuario.save();
        }

        return response.status(200).json(usuario);

    } catch(error) {
        const status = error.message.status || 400
        const message = error.message.msg || error.message
        return response.status(parseInt(status)).send({
            message: "Falha na operação de criar Depósito",
            cause: message
        });
    }
}

module.exports = new UsuarioController()