const { createOneUsuario, loginUsuario } = require('../controllers/usuario.controller')
const { Router } = require('express')

class UsuarioRouter{
    routesFromUsuario () {
        const usuarioRoutes  = Router()
        usuarioRoutes.post('/createOneUsuario', createOneUsuario)
        usuarioRoutes.post('/loginUsuario', loginUsuario)
        return usuarioRoutes
    }
}

module.exports = new UsuarioRouter()