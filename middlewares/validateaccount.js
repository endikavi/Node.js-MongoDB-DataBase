const validator = require('validator');

regular_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9À-ž]{1,3}\.[0-9À-ž]{1,3}\.[0-9À-ž]{1,3}\.[0-9À-ž]{1,3}])|(([a-zA-ZÀ-ž\-0-9]+\.)+[a-zA-ZÀ-ž]{2,3}))$/;
regular_username = /(?=^[A-z0-9À-ž]+$).{3,15}$/;
regular_password_secure = /(?=^[a-zA-Z0-9]+$)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,40}$/;

exports.validateAccount = (user) => {

    if(typeof(user.username) != "undefined" && typeof(user.password) != "undefined" && typeof(user.email) != "undefined" && 
      user.username !== "" && user.password !== "" && user.email !== "" ){
            
        if (regular_email.test(user.email)) {
			
			if(regular_username.test(user.username)){
			
				if (regular_password_secure.test (user.password)){
				
					console.log('informacion valida');
					return true;
				
				}else{console.log('Contraseña no valida')}//return de mensajes de vuelta a la pagina//

			}else{
				console.log('Nombre de usuario no valido');
			}
			
        }else{
			console.log('Email no valido');
		}
           
    }else{
		console.log('Faltan datos requeridos');
	}
}