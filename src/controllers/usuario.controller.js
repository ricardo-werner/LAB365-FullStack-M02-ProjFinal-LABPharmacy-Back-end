const { Usuario } = require('../models/Usuario')
const { senha } = require('../models/Usuario')
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
                dt_nascimento,
                cpf,
                telefone,
                email,
                senha,
                status
            } = request.body;

            const existeUsuario = await Usuario.findOne({
                where: { cpf: cpf }
            })
            if (existeUsuario) {
                return response.status(409).send({
                    message: "Falha na operação ao criar usuário",
                    cause: "CPF já existe"
                })
            }

            const Usuario = await Usuario.create({
                nome,
                sobrenome,
                genero,
                dt_nascimento,
                cpf,
                telefone,
                email,
                senha,
                status
            })

            return response.status(201).send({
                identificador: Usuario.id,
                nome: Usuario.nome,
                sobrenome: Usuario.sobrenome,
                genero: Usuario.genero,
                dt_nascimento: Usuario.dt_nascimento,
                cpf: Usuario.cpf,
                telefone: Usuario.telefone,
                email: Usuario.email,
                senha: Usuario.senha,
                status: Usuario.status
            })
        } catch (error) {
            return response.status(400).send(
                {
                    message: "Falha na operação de criar usuário",
                    cause: "Usuário não criado"
                }
            )
        }
    }

    async loginUsuario(request, response) {
        try {
            const {
                email,
                senha
            } = request.body;

            //console.log(request.body)

            const Usuario = await Usuario.findOne({
                where: { email: email }
            })

            if (!Usuario) {
                return response.status(404).send({
                    message: "Tentativa de Login Falhou",
                    cause: "E-mail não encontrado"
                })
            }

            //console.log(Usuario)

            if (Usuario.senha === senha) {
                const payload = { "email": Usuario.email, "senha": Usuario.senha }
                const token = sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: '1d' })
                console.log(token)
                console.log("Senha Igual")
                return response.status(201).send({ "token": token })
            }
            else {
                console.log("Senha Diferente")
                return response.status(400).send({ "msg": "Senha Invalida" })
            }
        } catch (error) {
            return response.status(404).send({
                message: "Tentativa de Login Falhou",
                cause: "E-mail não encontrado"
            })
        }
    }

    async listAllUsuarios(request, response) {
        try {
            const Usuario = await Usuario.findAll()
            return response.status(200).send(Usuario)
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
            const Usuario = await Usuario.findByPk({
                where: { id: id },
                attributes: { exclude: ['senha'] }
            })

            if (!Usuario) {
                return response.status(404).send({
                    message: "Falha na operação de listar usuário",
                    cause: "Usuário não encontrado"
                })
            }

            return response.status(200).send(Usuario)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de listar usuário",
                cause: "Usuário não encontrado"
            })
        }
    }

    async updateOneUsuario(request, response) {
        try {
            const { id } = request.params;
            const {
                nome,
                sobrenome,
                genero,
                dt_nascimento,
                cpf,
                telefone,
                email,
                senha,
                status
            } = request.body;

            const Usuario = await Usuario.findByPk(id)

            if (!Usuario) {
                return response.status(404).send({
                    message: "Falha na operação de atualizar usuário",
                    cause: "Usuário não encontrado"
                })
            }

            Usuario.nome = nome,
                Usuario.sobrenome = sobrenome,
                Usuario.genero = genero,
                Usuario.dt_nascimento = dt_nascimento,
                Usuario.cpf = cpf,
                Usuario.telefone = telefone,
                Usuario.email = email,
                Usuario.senha = senha

            return response.status(202).send(Usuario)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de atualizar usuário",
                cause: "Usuário não encontrado"
            })
        }
    }

    async updateOneStatus(request, response) {
        try {
            const { id } = request.params;
            const {
                status
            } = request.body;

            if (!Usuario) {
                return response.status(404).send({
                    message: "Falha na operação de atualizar status",
                    cause: "Usuário não encontrado"
                })
            }

            if (status != 'Ativo' && status != 'Inativo') {
                return response.status(404).send({
                    message: "Falha na operação de atualizar status",
                    cause: "Status inválido"
                })
            }

            const Usuario = await Usuario.update({
                status
            }, {
                where: { id: id }
            })

            return response.status(200).send(Usuario)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de atualizar status",
                cause: "Status inválido"
            })
        }
    }

    async updateOneSenha(request, response) {
        try {
            const { id } = request.params;
            const {
                senha
            } = request.body;

            if (!Usuario) {
                return response.status(404).send({
                    message: "Falha na operação de atualizar status",
                    cause: "Usuário não encontrado"
                })
            }

            const Usuario = await senha.update({
                senha
            }, {
                where: { id: id, senha: senha }
            })

            return response.status(200).send(Usuario)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de atualizar senha",
                cause: "Senha inválida"
            })
        }
    }
    // Definir o endpoint para deletar usuário (deleção física)
    //
    // async deleteOneUsuario(request, response) {
    //     try {
    //         const { id } = request.params
    //         const Usuario = await Usuario.destroy({
    //             where: { id: id }
    //         })
    //         return response.status(200).send(Usuario)
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

        const user = await Usuario.findByPk(id);
        if (!user) {
            return response.status(404).json({ error: 'Usuário não encontrado' });
        }

        if (user.status === 'ativo') {
            user.status = 'inativo';
            user.deletedAt = new Date();
            console.log(user.deletedAt)
        } else if (user.status === 'inativo') {
            user.status = 'ativo';
            user.deletedAt = null;
        }


        await user.save();
        return response.status(200).json(user);

    } catch(error) {
        return response.status(400).json({
            message: 'Falha na operação de deletar usuário',
            cause: "Usuário não encontrado"
        });
    }
}

module.exports = new UsuarioController()