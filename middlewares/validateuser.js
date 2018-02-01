
const validator = require('validator');

exports.validatereq = (user) => {

    if (validator.isEmail(user.email)) {

        return true
    } else {
         console.log( req.body.email + ' No es un email');
        res.send('Datos no validos');
    }
}