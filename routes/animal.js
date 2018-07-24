'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/animals'});
var auth = require('../middlewaves/autenticated');
var api = express.Router();

api.get('/animals', auth.ensureAuth,  AnimalController.getAnimals);
api.get('/animal/:id',auth.ensureAuth, AnimalController.getAnimal);
api.post('/animal', auth.ensureAuth,AnimalController.saveAnimal);
api.post('/animals', auth.ensureAuth);
api.put('/animal/:id', auth.ensureAuth, auth.ensureAuth,AnimalController.updateAnimal);
api.delete('/animal/:id', auth.ensureAuth, AnimalController.deleteAnimal);
api.post('/animal-upload-image/:id', [md_upload, auth.ensureAuth], AnimalController.uploadImage);

module.exports = api;
