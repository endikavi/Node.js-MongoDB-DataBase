
const validator = require('validator');

exports.validateUserPost = (user) => {

    if(typeof(user.active) != "undefined" && typeof(user.dni) != "undefined" && typeof(user.email) != "undefined"){
            
        validator.toBoolean(user.active)
            
        if (validator.isEmail(user.email)) {
            
            const dni = user.dni;

 
            regular_dni = /^\d{8}[a-zA-Z]$/;
 
            if(regular_dni.test (dni) == true){
                number = dni.substr(0,dni.length-1);
                leter = dni.substr(dni.length-1,1);
                number = number % 23;
                leters='TRWAGMYFPDXBNJZSQVHLCKET';
                leters=leters.substring(number,number+1);
                if (leters!=leter.toUpperCase()) {
                    console.log('Dni erroneo, la letra del NIF no se corresponde');
                }else{
                    console.log('Dni correcto')
                    return true;
                }
            }else{
                console.log('Dni erroneo, formato no válido');
            }
        
        }
        
    }else{console.log('Faltan datos requeridos')}
           
}

