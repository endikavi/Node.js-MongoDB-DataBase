const express = require('express');
const route = express.Router();
const app = express();
const UserCtrl = require('../controllers/userctrl')
const User = require('../modules/user-schema')
const bodyParser = require('body-parser');

// body parser //
app.use (bodyParser.json())

// route to obtain all users //
app.get('/',(req, res) => UserCtrl.getAllUsers(req, res));

// route to add user //
app.post('/',(req, res) => UserCtrl.addUser(req, res));

// route to delete user //
app.delete('/:_id',(req, res) => UserCtrl.deleteUser(req, res));

// route to update user //
app.put('/:_id',(req, res) => UserCtrl.updateUser(req, res));






/*
// find by id    
app.get('/:_id', function (req, res) {

    User.find({
        _id: req.params._id
    }).lean().exec(function (err, users) {
        if (err) return console.error(err);
        console.log('Se pidio la lista de usuarios,actualmente contiene ' + users.length + ' usuarios');
        res.send('{"users":' + JSON.stringify(users) + '}');
    })
})

// route for searchs //

app.post('/find', urlencodedParser, function (req, res) {
    User.find(req.body).lean().exec(function (err, Users) {
        if (err) return console.error(err);
        console.log(req.body)
        console.log('Se busco en la lista de usuarios,resultados: ' + Users.length);
        res.send('{"users":' + JSON.stringify(Users) + '}');
    })
})

// route for specific //

app.get('/findactive', urlencodedParser, function (req, res) {
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

app.post('/many', urlencodedParser, function (req, res) {

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
// route to delete users by id in the url //

app.delete('/:_id', function (req, res) {
    User.remove({
        _id: req.params._id
    }, function (err) {
        if (err) return handleError(err);
    });
    console.log('Usuario eliminado ID: ' + req.params._id);
    res.send('Usuario eliminado ID: ' + req.params._id);
})

//ruta para eliminar varios usuarios

app.delete('/del', function (req, res) {
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
app.put('/:_id', urlencodedParser, function (req, res) {

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
app.path('/email/:_id', function (req, res) {

    console.log('email actualizado: ' + req.body.email);

    res.send('email actualizado: ' + req.body.email);
})
*/


module.exports = app;
