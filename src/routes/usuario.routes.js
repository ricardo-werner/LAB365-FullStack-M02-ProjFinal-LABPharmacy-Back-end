const {
    createOneUsuario,
    loginUsuario,
    listAllUsuarios,
    listOneUsuario,
    updateOneUsuario,
    deleteOneUsuario
} = require('../controllers/usuario.controller')
const { Router } = require('express')

class UsuarioRouter {
    routesFromUsuario() {
        const usuarioRoutes = Router()
        usuarioRoutes.post('/createOneUsuario', createOneUsuario)
        usuarioRoutes.get('/loginUsuario', loginUsuario)
        usuarioRoutes.get('/listAllUsuarios', listAllUsuarios)
        usuarioRoutes.get('/listOneUsuario/:id', listOneUsuario)
        usuarioRoutes.patch('/updateOneUsuario/:id', updateOneUsuario)
        usuarioRoutes.delete('/deleteOneUsuario/:id', deleteOneUsuario)
        return usuarioRoutes
    }
}

module.exports = new UsuarioRouter()