const Account = require('../models/user-account-schema');
const accountValidator = require('../middlewares/validateaccount');
const User = require('../models/user-account-schema');
const checker = require('../modules/checker')
const encrypt = require('../modules/encrypt')
const problem_email_taked = "el email proporcionado ya esta vinculado a una cuenta.";
const problem_username_taked = "el nombre de usuario indicado ya esta en uso.";


// funcion checkeo //

function repeatedEmail(data){
    
return data.email == this;
    
}

function repeatedUsername(data){
    
return data.email == this;
    
}

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
    check = accountValidator.validateAccount(req.body);
	accountValidator.seeIfRepeated(req.body)
		.then((data) =>{
    		if(check == true){
				allproblems = ["Datos no validos"];
				email = data.find(repeatedEmail,req.body.email)
				username = data.find(repeatedUsername,req.body.username)
				if( username !== undefined){checker.addproblem(1,problem_username_taked)}
                if( email !== undefined){checker.addproblem(1,problem_email_taked)}
                if( username !== undefined || email !== undefined){
       			  res.render('register', {alert: checker.addproblem(2,"")});
    		    }else{
                      req.body["time"] = Date.now();
                      req.body["verified"] = false
                      encrypt.hashPassword(req.body, res)
                }
				
			}else{
       			console.log(check);
       			res.render('register', {alert: check});
    		}
		})
}


    
