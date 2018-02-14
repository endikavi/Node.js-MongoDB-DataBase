const checker = require('../modules/checker')
const problem_email_taked = "El email proporcionado ya esta vinculado a una cuenta.";
const problem_username_taked = "El nombre de usuario indicado ya esta en uso.";
const User = require('../modules/user-schema');
// checkear que no existe el usuario o email //

exports.checkPromise = (username,email) =>{

	return new Promise(function (resolve, reject, username, email) {
		// Do async job
		(User.find({$or: [{ 'email': email },{ 'username': username }]}).lean().exec(function (err, result) {
			if (err) {
				reject(err);
			}
			resolve(result);
		}))
	})
}

