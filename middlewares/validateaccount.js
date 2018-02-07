const validator = require('validator');

exports.validateAccount = (user) => {

    if(typeof(user.username) != "undefined" && typeof(user.password) != "undefined" && typeof(user.email) != "undefined" && 
       typeof(user.username) == "" && typeof(user.password) == "" && typeof(user.email) == "" ){
            
        
        if (validator.isEmail(user.email)) {

                    return true;
            console.log('informacion valida')
        }else{ console.log('informacion no valida')}
           
    }else{console.log('Faltan datos requeridos')}
}