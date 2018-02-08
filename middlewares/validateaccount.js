const validator = require('validator');

exports.validateAccount = (user) => {

    if(typeof(user.username) != "undefined" && typeof(user.password) != "undefined" && typeof(user.email) != "undefined" && 
      user.username === null && user.password === null && user.email === null ){
            
        
        if (validator.isEmail(user.email)) {

                    return true;
            console.log('informacion valida')
        }else{ console.log('informacion no valida')}
           
    }else{console.log('Faltan datos requeridos')}
}