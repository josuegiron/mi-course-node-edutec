'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var scrent = 'desencriptacion-de-tonken';

exports.ensureAuth = function(req, res, next){
var authorizationHeader = req.headers.authorization;
if(!authorizationHeader){
    return res.status(403).sent({
        message: 'la peticion de be contener un heder de autenticacion'
    });
}
var token = req.headers.authorization.replace(/['"]+/g,'');
try{
    var payload = jwt.decode(token, secret);
    var expireDate = payload.exp;
    var actualDate = momment().unix;
    if(expireDate <= actualDate){
        return res.status(401).send({
            message: 'El Token ha espirado'
        });
    }
    console.log(payload);

}catch(exeption){
    return res.status(404).send({
        message: 'el token no es valido'
    });
}
req.user = payload;
next();
}