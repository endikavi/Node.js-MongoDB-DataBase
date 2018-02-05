const User = require('../modules/user-schema');
const UserValidator = require('../middlewares/validateuser');

exports.prueba = (req, res) => {
	res.send('hola');
	console.log('hola');
}

exports.getAllUsers = (req, res) => {

	User.find().lean().exec(function (err, users) {
		if (err) return console.error(err);
		console.log('Se pidio la lista de usuarios,actualmente contiene ' + users.length + ' usuarios');
		res.send('{"users":' + JSON.stringify(users) + '}');

	})
}

exports.addUser = (req, res) => {

	if (UserValidator.validateUserPost(req.body) == true) {

		console.log('Informacion valida');
		const NewUser = new User();
		Object.assign(NewUser, req.body);
		NewUser.save()

			.then(user => {
				res.send(user);
				console.log('Añadido usuario:');
				console.log(user);
			})
			.catch(error => {
				res.send('Usuario no añadido');
				console.log('Usuario no añadido');
			})

	} else {

		console.log('Informacion no valida')
		res.send('Informacion no valida')
	}
}

exports.delUser = (req, res) => console.log('hola')

exports.deleteUser = (req, res) => {}
