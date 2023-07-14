const { createOneUsuario } = require('../controllers/usuario.controller')
const { Router } = require('express')

class UsuarioRouter{
    routesFromUsuario () {
        const usuarioRoutes  = Router()
        usuarioRoutes.post('/createOneUsuario', createOneUsuario)
        return usuarioRoutes
    }
}

module.exports = new UsuarioRouter()