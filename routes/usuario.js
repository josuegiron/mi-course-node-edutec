'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();

api.get('/animals', UsuarioController.getAnimals);


module.exports = api;