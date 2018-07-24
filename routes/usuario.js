'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');
var auth = require('../middlewaves/autenticated')
var api = express.Router();

api.get('/prueba',auth.ensureAuth,  UsuarioController.getUsuario);
api.post('/register', UsuarioController.register);
api.post('/login',  UsuarioController.login);

module.exports = api;