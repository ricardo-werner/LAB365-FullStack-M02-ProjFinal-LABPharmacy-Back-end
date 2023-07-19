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
                dt_nascimento,
                cpf,
                telefone,
                email,
                senha,
                status
            } = request.body;

            console.log(request.body);

            const existeUsuario = await Usuario.findOne({
                where: { cpf: cpf }
            });
            if (existeUsuario) {
                return response.status(409).send({
                    message: "Falha na operação ao criar usuário",
                    cause: "CPF já existe"
                });
            }

            const novoUsuario = await Usuario.create({
                nome,
                sobrenome,
                genero,
                dt_nascimento,
                cpf,
                telefone,
                email,
                senha,
                status
            });

            return response.status(201).send({
                identificador: novoUsuario.id,
                nome: novoUsuario.nome,
                sobrenome: novoUsuario.sobrenome,
                genero: novoUsuario.genero,
                dt_nascimento: novoUsuario.dt_nascimento,
                cpf: novoUsuario.cpf,
                telefone: novoUsuario.telefone,
                email: novoUsuario.email,
                senha: novoUsuario.senha,
                status: novoUsuario.status
            });
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de criar usuário",
                cause: "Usuário não criado"
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
                where: { email: email, senha: senha }
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
                    cause: "Senha inválido"
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
                    message: "Usuário não encontrado",
                    cause: "Falha na operação de listar usuário"
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

        const user = await usuario.findByPk(id);
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