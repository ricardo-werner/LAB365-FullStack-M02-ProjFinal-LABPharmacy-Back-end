const {
    createOneUsuario,
    loginUsuario,
    listAllUsuarios,
    listOneUsuario,
    updateOneUsuario,
    updateOneSenha,
    deleteOneUsuario
} = require('../controllers/usuario.controller')
const { Router } = require('express')
const { auth } = require('../middleware/auth')

class UsuarioRouter {
    routesFromUsuario() {
        const usuarioRoutes = Router()
        usuarioRoutes.post('/createOneUsuario', createOneUsuario)
        usuarioRoutes.post('/loginUsuario', loginUsuario)
        usuarioRoutes.get('/listAllUsuarios', auth, listAllUsuarios)
        usuarioRoutes.get('/listOneUsuario/:id', auth, listOneUsuario)
        usuarioRoutes.patch('/updateOneUsuario/:id', auth, updateOneUsuario)
        //usuarioRoutes.patch('/updateOneUsuario/:id/status', auth, updateOneUsuario)
        usuarioRoutes.patch('/updateOneUsuario/:id/senha', auth, updateOneSenha)
        usuarioRoutes.delete('/deleteOneUsuario/:id', auth, deleteOneUsuario)
        return usuarioRoutes
    }
}

module.exports = new UsuarioRouter()