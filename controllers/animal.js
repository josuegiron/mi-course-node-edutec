'use strict'

// modulos
var fs = require('fs');
var path = require('path');

var Animal = require('../models/animal');

function getAnimals(req, res) {
    res.status(200).send({
        message: 'Probando el controlador de animales'
    })
}

function getAnimal(req, res) {
    var animalId = req.params.id;

    Animal.findById(animalId).exec((err, animal) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            if (!animal) {
                res.status(404).send({
                    message: 'Animal no existe'
                });
            } else {
                res.status(200).send({
                    animal
                });
            }
        }
    });
}


function uploadImage(req, res){
    var animalId = req.params.id;
    var file_name = "No imagen";
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\/');
        var file_name = file_split[2];
        
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg'){
            Animal.findByIdAndUpdate(animalId, {image: file_name}, {new: true}, (err, animalUptdated)=>{
                if(err){
                    res.status(500).send({
                        message: "Error al acutalizar la imagen"
                    })
                }else{
                    if(!animalUptdated){
                        res.status(404).send({
                            message:"No se ha actualizado el animal"
                        })
                    }else{
                        res.status(200).send({
                            animal: animalUptdated,
                            image: file_name
                        })
                    }
                }
            });
        }else{
            fs.unlink(file_path, (err)=>{
                if(err){
                    res.status(200).send({
                        message: 'Extencion del archivo no valida y no encontrada'
                    });
                }else{
                    res.status(200).send({
                        message: "Extrension del archivo invalida"
                    });
                }
            })
        }
    }else{
        res.status(200).send({
            message: "No se ha subido el archivo"
        })
    }
}

function saveAnimal(req, res) {
    var animal = new Animal();
    var params = req.body;

    if (params.name) {
        animal.name = params.name;
        animal.description = params.description;
        animal.origen.country = params.country;
        animal.origen.state = params.state;
        animal.image = null;

        animal.save((err, animalStored) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en el servidor'
                });
            } else {
                if (!animalStored) {
                    res.status(404).send({
                        message: 'No se ha guardado el animal'
                    });
                } else {
                    res.status(200).send({
                        animal: animalStored
                    });
                }
            }
        });
    } else {
        res.status(200).send({
            message: 'El nombre del animal es obligatorio'
        });
    }
}

module.exports = {
    getAnimals,
    saveAnimal,
    getAnimal,
    uploadImage
}