const { Usuario } = require('../models/usuario')
const { SECRET_KEY_JWT } = require('../config/database.config')
const { config } = require('dotenv')
const { sign } = require('jsonwebtoken')
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

            const data = await Usuario.create({
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

            return response.status(201).send(data)
        } catch (error) {
            return response.status(400).send(
                {
                    message: "Falha na operação de criar usuário",
                    cause: error.message
                }
            )
        }


    }

    async loginUsuario(request, response) {
        try {
            const {
                email,
                password
            } = request.body;

            console.log(request.body)

            const usuario = await Usuario.findOne({
                where: { email: email }
            })

            console.log(usuario)

            if (usuario.password === password) {
                const payload = { "email": usuario.email, "password": usuario.password }
                const token = sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: '1d' })
                console.log(token)
                console.log("Senha Igual")
                return response.status(202).send({ "token": token })
            }
            else {
                console.log("Senha Diferente")
                return response.status(400).send({ "msg": "Senha Invalida" })
            }
        } catch (error) {
            return response.status(401).send({
                message: "Tentativa de Login Falhou",
                cause: error.message
            })
        }
    }

    async listAllUsuarios(request, response) {
        try {
            const data = await Usuario.findAll()
            return response.status(200).send(data)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de listar usuários",
                cause: error.message
            })
        }
    }

    async listOneUsuario(request, response) {
        try {
            const { id } = request.params
            const data = await Usuario.findOne({
                where: { id: id }
            })
            return response.status(200).send(data)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de listar usuário",
                cause: error.message
            })
        }
    }

    async updateOneUsuario(request, response) {
        try {
            const { id } = request.params
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

            const data = await Usuario.update({
                nome,
                sobrenome,
                genero,
                dt_nascimento,
                cpf,
                telefone,
                email,
                senha,
                status
            }, {
                where: { id: id }
            })

            return response.status(200).send(data)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de atualizar usuário",
                cause: error.message
            })
        }
    }

    // async deleteOneUsuario(request, response) {
    //     try {
    //         const { id } = request.params
    //         const data = await Usuario.destroy({
    //             where: { id: id }
    //         })
    //         return response.status(200).send(data)
    //     } catch (error) {
    //         return response.status(400).send({
    //             message: "Falha na operação de deletar usuário",
    //             cause: error.message
    //         })
    //     }
    // }

    // Definir o endpoint para atualizar o status de um usuário (deleção lógica)
    async deleteOneUsuario(req, res) {
        const { id } = req.params;

        // Buscar o usuário pelo identificador
        const user = await Usuario.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
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

module.exports = new UsuarioController()