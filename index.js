'use strict'

var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:Benjamin6ir0n1@ds263380.mlab.com:63380/curso-nodejs');

app.listen(port);

console.log('Edutec Backend is running')