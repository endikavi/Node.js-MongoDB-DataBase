const accountCtrl = require('../controllers/accountctrl')
const User = require('../models/user-account-schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const session = require('express-session');
const uid = require('uid-safe')
const sess = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true 
    }
}

exports.hashPassword = (req,res) => {

	bcrypt.hash(req.password, saltRounds, function(err, hash) {
        
        req["password"] = hash;
        const NewUser = new User();
        Object.assign(NewUser, req);
        NewUser.save()

            .then(user => {
				console.log('Añadido usuario:');
				console.log(user);
                res.render('login', {alert: '<div class="alert alert-success"><p>Registro completo</p></div>'});  
			 })
			 .catch(error => {
				res.render('register', {alert: '<div class="alert alert-danger"><p>Fallo en el registro</p></div>'});
				console.log('Usuario no añadido');
                console.log(error);
			 })
        
	});
	
}

exports.checkPassword = (req,res) => {
    	User.find({username: req.body.username}).lean().exec(function (err, users) {
		if (err) return console.error(err);
           if(users.length === 1){
	       bcrypt.compare(req.body.password, users[0].password, function(err, resp) {
               if (err) return console.error(err);
               if (resp === true){
                   
                   req.session.user = users[0];
                   res.render('dashboard', {alert: '<div class="alert alert-success"><p>pin pan</p></div>'})
                   
                   }else{
                   res.render('login', {alert: '<div class="alert alert-success"><p>Contraseña no coincide</p></div>'}) 
               }
	       })}else{res.render('login', {alert: '<div class="alert alert-danger"><p>Usuario no existe</p></div>'})}

        })}
                                                    