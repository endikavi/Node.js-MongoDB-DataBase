const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const jsonParser = bodyParser.raw();
const urlencodedParser = bodyParser.urlencoded({extended: false})
let index = require('./routes/index');
let users = require('./routes/users');
let prueba = require('./routes/Prueba');
const mongodbRoute ='mongodb://endika:endika@ds149865.mlab.com:49865/base_datos_aeg';
const port = 8080;
const app = express();

// Modulos


/*MONGODB*/
const options = {
	useMongoClient: true,
	socketTimeoutMS: 0,
	keepAlive: true,
	reconnectTries: 30
};

mongoose.Promise = global.Promise
mongoose.connect(mongodbRoute, options, (err) => {
	if (err) {
		return console.log(`Error al conectar a la base de datos: ${err}`)
	}
	app.listen(port, () => {
		console.log(`Servidor up en ${port}`);
	});
	console.log(`Conexión correcta.`)
});

//esquema de usuario

const userSchema = mongoose.Schema({
    dni: String,
    first_name: String,
    last_name: String,
    email: String    
});

//modelo de usuario

const User = mongoose.model('User', userSchema);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', index);
//app.get('/users', users);
//app.get('/prueba', prueba);

//ruta para ver usuarios
app.get('/user', function(req, res) {
    
    User.find().lean().exec(function (err, Users) {
        if (err) return console.error(err);
        let Data = JSON.stringify(Users);
        console.log('Lista de usuarios:');
        console.log(Users);
        res.send('{"users":[' + Data + ']}');
        
})
})

//ruta para resetear los usuarios
app.get('/userreset', function(req, res) {
    
	console.log('Usuarios recuperados');
    
	res.send('Usuarios recuperados');
})

//ruta para añadir usuario
app.post('/user', urlencodedParser, function(req, res) {
    
    const NewUser = new User({ 
        dni: req.body.dni,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email    
    });
    
    NewUser.save(function (err, NewUser) {
        if (err) return console.error(err);
    });
    
	console.log(
        'Usuario añadido: DNI: ' + req.body.dni + 
        " Nombre: " + req.body.first_name +
		" Apellido: " + req.body.last_name +
        " Email: " + req.body.email);
    
	res.send(
        'Usuario añadido: DNI: ' + req.body.dni + 
        " Nombre: " + req.body.first_name +
		" Apellido: " + req.body.last_name + 
        " Email: " + req.body.email);
    

})

//ruta para eliminar usuario
app.delete('/user', urlencodedParser, function(req, res) {
    
    User.remove({ dni: req.body.dni }, function (err) {
    if (err) return handleError(err);
    });
    
	console.log('Usuario eliminado: DNI ' + req.body.dni);
	res.send('Usuario eliminado: DNI ' + req.body.dni);
})

//ruta para actualizar usuario
app.put('/user', function(req, res) {
    
    const Update = ({ 
        dni: req.body.dni,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email    
    });
    
    User.update({ _id: req.body._id }, Update , function (err) {
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
app.post('/useremail', function(req, res) {
    
	console.log('email actualizado: ' + req.body.email);
    
	res.send('email actualizado: ' + req.body.email);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//cross-domain error fix
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;