'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();

api.get('/prueba', UsuarioController.getUsuario);
api.post('/register', UsuarioController.register);
api.post('/login', UsuarioController.login);

module.exports = api;