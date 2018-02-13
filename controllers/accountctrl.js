const Account = require('../models/user-account-schema');
const accountValidator = require('../middlewares/validateaccount');
const User = require('../modules/user-schema');

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
	
    if(check == true){ 
		console.log('todo correcto');
		res.send('Registrado');
	}else{
       console.log(check);
       res.render('register', {alert: check});
    }
}

// checkear que no existe el usuario o email //

exports.checkUsername = (data) => {

   return (User.find({username: data}).lean().exec(function (err, users) {
        if (err) return console.error(err);
		console.log(users.length);
		return users.length;
	}))
}

exports.checkEmail = (data) => {

    users = (User.find({email: data}).lean())
		console.log(users);
		return (users.length);
}