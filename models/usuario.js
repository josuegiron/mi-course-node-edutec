'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    name: String,
    lastname: String,
    image: String,
    email: String,
    password: String,
    role: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);