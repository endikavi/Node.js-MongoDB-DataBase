function validatereq(data) {

    if (validator.isEmail(data.email)) {

        return true
    } else {
         console.log( req.body.email + ' No es un email');
        res.send('Datos no validos');
    }
}