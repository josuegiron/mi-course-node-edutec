'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

var secret = 'desencriptacion-de-token';

exports.cretateToken = function(user){
    var payload = {
        pub: user._id,
        name: user.name, 
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    }
}
