const validator = require('validator');
const AccountCtrl = require('../controllers/accountctrl')

let problem = "Datos no validos:<br>";
const problem_lost = "Faltan datos necesarios.";
const problem_username = "El nombre de usuario no es valido.";
const problem_username_taked = "El nombre de usuario indicado ya esta en uso.";
const problem_email = "Email incorrecto.";
const problem_email_taked = "El email proporcionado ya esta vinculado a una cuenta.";
const problem_password = "Contraseña no valida.";
const problem_repeated = "La contraseña no puede contener el nombre de usuario.";

regular_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9À-ž]{1,3}\.[0-9À-ž]{1,3}\.[0-9À-ž]{1,3}\.[0-9À-ž]{1,3}])|(([a-zA-ZÀ-ž\-0-9]+\.)+[a-zA-ZÀ-ž]{2,3}))$/;
regular_username = /(?=^[A-z0-9À-ž]+$).{3,15}$/;
regular_password_secure = /(?=^[a-zA-Z0-9]+$)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,40}$/;

exports.validateAccount = (user) => {

	if(typeof(user.username) != "undefined" && typeof(user.password) != "undefined" && typeof(user.email) != "undefined" && 
    user.username !== "" && user.password !== "" && user.email !== "" ){
            
		x = 0;
		problems = problem;
		
    	if (regular_email.test(user.email)) {x++}else{problems = problems + problem_email};
			
		if(regular_username.test(user.username)) {x++}else{problems = problems + problem_username};
			
		if (regular_password_secure.test (user.password)) {x++}else{problems = problems + problem_password};
		
		if (AccountCtrl.checkEmail(user.email) === 0) {x++}else{problems = problems + problem_email_taked};
		
		if (AccountCtrl.checkUsername(user.username) === 0) {x++}else{problems = problems + problem_username_taked};
		
		if (user.password.toLowerCase().indexOf(user.username.toLowerCase()) === -1) {x++}else{problems = problems + problem_repeated};
		
		if (x == 6){return true}else{return problems};
		
	}else{return problem_lost};
}

    