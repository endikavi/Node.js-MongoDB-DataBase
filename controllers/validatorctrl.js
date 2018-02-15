const checker = require('../modules/checker')
const User = require('../models/user-account-schema');
// checkear que no existe el usuario o email //

exports.checkPromise = (username,email) =>{

	return new Promise(function (resolve, reject) {
		// Do async job
		(User.find({$or: [{ 'email': email },{ 'username': username }]}).lean().exec(function (err, result) {
			if (err) {
				reject(err);
			}
			resolve(result);
		}))
	})
}


