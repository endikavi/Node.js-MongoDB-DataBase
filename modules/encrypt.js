const accountCtrl = require('../controllers/accountctrl')
const User = require('../models/user-account-schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = (req,res) => {

	bcrypt.hash(req.password, saltRounds, function(err, hash) {
        
        req["password"] = hash;
        const NewUser = new User();
        Object.assign(NewUser, req);
        NewUser.save()

            .then(user => {
				console.log('Añadido usuario:');
				console.log(user);
                res.render('login', {alert: "Registro completo"});  
			 })
			 .catch(error => {
				res.render('register', {alert: "Fallo en el registro"});
				console.log('Usuario no añadido');
                console.log(error);
			 })
        
	});
	
}

exports.checkPassword = (pass, dbHash) => {
	
	bcrypt.compare(pass, dbHash, function(err, res) {
    	// res == true if password correct
		return res;
	});
}