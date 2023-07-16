const { Usuario } = require('../models/usuario')

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
                console.log("Senha Igual")
                return response.status(200).send(`palavra_secreta: ${SECRET_KEY}`)
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

    async deleteOneUsuario(request, response) {
        try {
            const { id } = request.params
            const data = await Usuario.destroy({
                where: { id: id }
            })
            return response.status(200).send(data)
        } catch (error) {
            return response.status(400).send({
                message: "Falha na operação de deletar usuário",
                cause: error.message
            })
        }
    }

}

module.exports = new UsuarioController()