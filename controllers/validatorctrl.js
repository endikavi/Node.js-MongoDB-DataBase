const checker = require('../modules/checker')
const User = require('../modules/user-schema');
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

exports.checkdata = (user,results) =>{
	if(results.length == 2){return 3}
	if(results.length == 0){return true}
	if(results.find(email === user.email)){console.log('email repetido')}
	
	
}

