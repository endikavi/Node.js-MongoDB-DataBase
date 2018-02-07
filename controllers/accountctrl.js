const Account = require('../models/user-account-schema');
const accountValidator = require('../middlewares/validateaccount');

// Mostrar login //
exports.renderLogin = (req , res) => {
    console.log('Pedido el login');
    res.render('login')
}

// Mostrar la pagina de registro //
exports.renderRegister = (req , res) => {
    console.log('Pedido la vista de registro');
    res.render('register')
}

// Logearse //
exports.accountLogin = (req , res) => {
    console.log('Intento de login');
    console.log(req.body);
    res.render('login')
}

// Registrarse //
exports.accountRegister = (req , res) => {
    console.log('Intento de registro');
    console.log(req.body);
   if (accountValidator.validateAccount(req.body) == true){
       console.log('todo correcto')
   }else{
       res.render('register')
   }
}