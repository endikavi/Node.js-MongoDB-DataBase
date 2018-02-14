const checker = require('../modules/checker')
const ValidatorCtrl = require('../controllers/validatorctrl')
const problem_lost = "Faltan datos necesarios.";
const problem_username = "El nombre de usuario no es valido.";
const problem_email = "Email incorrecto.";
const problem_password = "Contraseña no valida.";
const problem_repeated = "La contraseña no puede contener el nombre de usuario.";

regular_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9À-ž]{1,3}\.[0-9À-ž]{1,3}\.[0-9À-ž]{1,3}\.[0-9À-ž]{1,3}])|(([a-zA-ZÀ-ž\-0-9]+\.)+[a-zA-ZÀ-ž]{2,3}))$/;
regular_username = /(?=^[A-z0-9À-ž]+$).{3,15}$/;
regular_password_secure = /(?=^[a-zA-Z0-9]+$)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,40}$/;

exports.validateAccount = (user) => {

	if( typeof(user.username) != "undefined" &&typeof(user.password) != "undefined" &&
		typeof(user.email) != "undefined" &&user.username !== "" &&
		user.password !== "" && user.email !== "" ){
		
		x = 0;
		allproblems = ["Datos no validos:<br>"];
		
    	if (regular_email.test(user.email)) {checker.addcheck(1);}
		else{checker.addproblem(1,problem_email)};
			
		if(regular_username.test(user.username)) {checker.addcheck(1);}
		else{checker.addproblem(1,problem_username)};
			
		if (regular_password_secure.test (user.password)) {checker.addcheck(1);}
		else{checker.addproblem(1,problem_password)};
             
		if (user.password.toLowerCase().indexOf(user.username.toLowerCase()) === -1) {checker.addcheck(1);}
		else{checker.addproblem(1,problem_repeated)};
        
        if (checker.addcheck(2) == 4){return true}
		
		}else{checker.addproblem(1,problem_lost)}

		return checker.addproblem(2,"")	
        
	} 

exports.seeIfRepeated = (user) => {
	return ValidatorCtrl.checkPromise(user.username, user.email)
}