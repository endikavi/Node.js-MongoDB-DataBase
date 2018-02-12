const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = (password) => {

	bcrypt.hash(password, saltRounds, function(err, hash) {
  		return hash;
	});
	
}

exports.checkPassword = (pass, dbHash) => {
	
	bcrypt.compare(pass, dbHash, function(err, res) {
    	// res == true if password correct
		return res;
	});
}