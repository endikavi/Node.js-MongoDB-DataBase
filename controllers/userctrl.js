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


exports.deleteUser = (req, res) => {
    User.remove({
        _id: req.params._id
    }, function (err) {
        if (err) return handleError(err);
    });
    console.log('Usuario eliminado ID: ' + req.params._id);
    res.send('Usuario eliminado ID: ' + req.params._id);
}


exports.updateUser = (req, res) => {
    const Update = ({
        dni: req.body.dni,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    });

    User.update({
        _id: req.params._id
    }, Update, function (err) {
        if (err) return handleError(err);
    });

    console.log('Usuario actualizado');

    res.send('Usuario actualizado')
}


exports.searchUser = (req, res) => {
    User.find({_id: req.params._id}).lean().exec(function (err, users) {
        if (err) return console.error(err);
        console.log('Busqueda de usuarios realizada,resultados obtenidos ' + users.length + ' usuarios');
        res.send('{"users":' + JSON.stringify(users) + '}');
    })
}


exports.addManyUsers = (req, res) => {
    req.body.map(element => {
        const NewUser = new User();
        Object.assign(NewUser, element);
        NewUser.save()
            .then(user => {
                res.send(user);
                console.log('Añadidos usuarios');
            })
            .catch(error => {
                res.send(error);
                console.log('Hubo algun fallo');
            });
    })
}

