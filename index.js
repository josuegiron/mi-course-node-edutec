'use strict'

var mongoose = require('mongoose');
var port = 3000;
var app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:hola123@ds263380.mlab.com:63380/curso-nodejs')
    .then(() => {
        console.log('La consexion a mongo a sido exitosa');
        app.listen(port, () => {
            console.log('El servidor local de node y express esta corriendo');
        });
    })
    .catch(err => console.log(err));