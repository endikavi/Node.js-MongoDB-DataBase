
const User = require('../modules/user-schema');
const UserValidator = require('../middlewares/validateuser');

exports.prueba = (req, res) => {
res.send('hola');
console.log('hola');    
}

exports.getAllUsers = (req, res) => {
        User.find().lean().exec(function (err, Users) {
        if (err) return console.error(err);
        console.log('Se pidio la lista de usuarios,actualmente contiene ' + Users.length + ' usuarios');
        res.send('{"users":' + JSON.stringify(Users) + '}');
    })
}
