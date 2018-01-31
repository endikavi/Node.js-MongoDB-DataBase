var express = require('express');
var UserRoutes = express();
//const UserCtrl = require('')//


// routes //

//UserRoutes.route()

// Añadir usuario

UserRoutes.post('/user', function (req, res, next) {

    console.log('Primera etapa');

    if (validatereq(req.body) == true){next();}


}, function (req, res, next) {

    console.log('Segunda etapa');
    console.log( req.body.email + ' Es un email');
    const NewUser = new User();
    Object.assign(NewUser, req.body);
    NewUser.save()
        .then(user => {
            res.send(user);
            console.log('Añadido usuario:');
            console.log(user);
        })
        .catch(error => {res.send('Usuario no añadido');})
});

// route to obtain all users //

UserRoutes.get('/user', function (req, res) {
    User.find().lean().exec(function (err, Users) {
        if (err) return console.error(err);
        console.log('Se pidio la lista de usuarios,actualmente contiene ' + Users.length + ' usuarios');
        res.send('{"users":' + JSON.stringify(Users) + '}');
    })
})

// find by id    
UserRoutes.get('/user/:_id', function (req, res) {

    User.find({
        _id: req.params._id
    }).lean().exec(function (err, Users) {
        if (err) return console.error(err);
        console.log('Se pidio la lista de usuarios,actualmente contiene ' + Users.length + ' usuarios');
        res.send('{"users":' + JSON.stringify(Users) + '}');
    })
})

// route for searchs //

UserRoutes.post('/userfind', urlencodedParser, function (req, res) {
    User.find(req.body).lean().exec(function (err, Users) {
        if (err) return console.error(err);
        console.log(req.body)
        console.log('Se busco en la lista de usuarios,resultados: ' + Users.length);
        res.send('{"users":' + JSON.stringify(Users) + '}');
    })
})

// route for specific //

UserRoutes.get('/userfindactive', urlencodedParser, function (req, res) {
    User.find({
        active: true
    }).lean().exec(function (err, Users) {
        if (err) return console.error(err);
        console.log(req.body)
        console.log('Se busco en la lista de usuarios los activos,resultados: ' + Users.length);
        res.send('{"users":' + JSON.stringify(Users) + '}');
    })
})

// route to add users //

UserRoutes.post('/usermany', urlencodedParser, function (req, res) {

    req.body.map(element => {
        const NewUser = new User();
        Object.assign(NewUser, element);
        NewUser.save()
            .then(user => {
                res.send(user);
                console.log('Añadidos usuarios');
            })
            .catch(error => {});
    })
})
/*   
UserRoutes.post('/user', urlencodedParser, function(req, res) {
    	const NewUser = new User();
    	Object.assign (NewUser,req.body);
    	NewUser.save()
    		.then(user => {
				res.send(user);
        		console.log('Añadido usuario:');
				console.log(user);
			})
    		.catch(error => {} )
    
})
*/
// route to delete users by id in the url //

UserRoutes.delete('/user/:_id', function (req, res) {
    User.remove({
        _id: req.params._id
    }, function (err) {
        if (err) return handleError(err);
    });
    console.log('Usuario eliminado ID: ' + req.params._id);
    res.send('Usuario eliminado ID: ' + req.params._id);
})

//ruta para eliminar varios usuarios

UserRoutes.delete('/userdel', function (req, res) {
    array = [];
    let obj = JSON.stringify(req.body);
    JSON.parse(obj, function (x, y) {
        let z = " : "
        let newobj = (x + z + y);
        array.push(JSON.parse(JSON.stringify((newobj))));
    })
    array.pop();
    console.log(array);

    array.map(element => {
        User.remove(element, function (err) {
            if (err) return handleError(err);
        });
    });
    res.send(array);

})

//ruta alternativa recibiendo el _id en la url
UserRoutes.put('/user/:_id', urlencodedParser, function (req, res) {

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

    console.log(
        'Usuario actualizado: DNI: ' + req.body.dni +
        " Nombre: " + req.body.first_name +
        " Apellido: " + req.body.last_name +
        " Email: " + req.body.email);

    res.send(
        'Usuario actualizado: DNI: ' + req.body.dni +
        " Nombre: " + req.body.first_name +
        " Apellido: " + req.body.last_name +
        " Email: " + req.body.email);
})
//ruta para modificar el email de un usuario
UserRoutes.path('/useremail/_id', function (req, res) {

    console.log('email actualizado: ' + req.body.email);

    res.send('email actualizado: ' + req.body.email);
})



module.exports = UserRoutes;
