const express = require('express')
const auth = require('./auth')

module.exports = function(server){

    /**
     * Rotas protegidas por Tokem JWT
     */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    const Rendimento = require('../api/rendimento/rendimentoService')
    Rendimento.register(protectedApi, '/rendimentos')
    
    /**
     * Rotas públicas
     */
    const openApi = express.Router()
    server.use('/oapi', openApi)
    
    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
}