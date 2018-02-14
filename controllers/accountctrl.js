const Account = require('../models/user-account-schema');
const accountValidator = require('../middlewares/validateaccount');
const User = require('../modules/user-schema');

const problem_email_taked = "El email proporcionado ya esta vinculado a una cuenta.";
const problem_username_taked = "El nombre de usuario indicado ya esta en uso.";

// Mostrar login //
exports.renderLogin = (req , res) => {
    console.log('Pedido el login');
    res.render('login');
}

// Mostrar la pagina de registro //
exports.renderRegister = (req , res) => {
    console.log('Pedido la vista de registro');
    res.render('register');
}

// Logearse //
exports.accountLogin = (req , res) => {
    console.log('Intento de login');
    console.log(req.body);
    res.render('login');
}

// Registrarse //
exports.accountRegister = (req , res) => {
    console.log('Intento de registro');
    console.log(req.body);
    check = accountValidator.validateAccount(req.body);
	accountValidator.seeIfRepeated(req.body)
		.then((data) =>{
    		if(check == true){
				
				email = data.find({return valor >= 10})
				
				if(email === false){console.log('bien')}
				allproblems = ["Datos no validos:<br>"];
				console.log(data);
				res.send('Registrado');
				
			}else{
       			console.log(check);
       			res.render('register', {alert: check});
    		}
		})
}
