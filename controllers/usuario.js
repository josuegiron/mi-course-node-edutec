'use strict'

// modulos
var fs = require('fs');
var path = require('path');

var Animal = require('../models/usuario');

function getUsuario(req, res) {
    res.status(200).send({
        message: 'Probando el controlador de usuarios'
    })
}

module.exports = {
    getUsuario
}