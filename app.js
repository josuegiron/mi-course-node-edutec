'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var animalRoutes = require('./routes/animal');
var usuarioRoutes = require('./routes/usuario');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json());

app.use('/api', animalRoutes);
app.use('/apiUsuario', usuarioRoutes);

app.get ('/test', (req, res) => {
    res.status(200).send({
        message: 'mi primer'
    });
});

module.exports = app;