'use strict'

// modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var jwt = require('../services/jwt')
var Usuario = require('../models/usuario');

function getUsuario(req, res) {
    res.status(200).send({
        message: 'Probando el controlador de usuarios'
    })
}

function register(req, res){
    var user = new Usuario();
    var params = req.body;

    if(params.name && params.lastname && params.email && params.password){
        user.name = params.name;
        user.lastname = params.lastname;
        user.email = params.email;
        user.role = 'ROLE_USER'
        user.image = null;
        console.log("hola");
        user.findOne({email: user.email.toLowerCase()}, (err, issetUser)=>{
            if(err){
                res.status(500).send({
                    message: "error en el server"
                });
            }else{
                if(!issetUser){
                bcrypt.hash(params.password,mi, null, null, (err, hash)=>{
                    user.password = hash;
                    user.save((err, userStored)=>{
                        if(err){
                            res.status(500).send({
                                messaje: "Error al guardar el usuario"
                            });
                        }else{
                            if(!userStored){
                                res.status(500).send({
                                    message: "No se ha ingresado el usuario"
                                });
                            }else{
                                res.status(200).send({
                                    user: userStored
                                })
                                
                            }
                        }
                    })
                });
                }else{
                    res.send({
                        messaje:"El usuario no se pudo registrar"
                    });
                }
            }
        })
    }else{
        res.status(200).send({
            message: "parametros erroneos"
        });
    }
}


function login(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    Usuario.findOne({email: email.toLowerCase()}, (err, issetUser)=>{
        if(err){
            res.status(500).send({
                messaje: "Error al buscar su usuario"
            });
        }else{
            if(!issetUser){
                bcrypt.compare(password, issetUser.password, (err, check)=>{
                    if(check){
                        if(params.gettoken){
                            res.status(200).send(
                                {
                                    token: jwt.cretateToken(issetUser)
                                }
                            )
                        }else{
                            res.status(200).send({
                                
                            })
                        }
                    }
                })
            }else{
                res.status(404).send({
                    message: "El usuario no ha podido loguearse"
                });
            }
        }
    });
}
module.exports = {
    getUsuario,
    register,
    login
}