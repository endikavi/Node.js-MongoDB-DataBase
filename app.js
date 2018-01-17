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
const User = require ('./moduloesquema');

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

app.get('/pong', function (req ,res){
    console.log('Pedido el pong')
    res.render('pong', { Estado: 'Activa' })})


//ruta para ver usuarios
app.get('/user', function(req, res) {
    
    User.find().lean().exec(function (err, Users) {
        if (err) return console.error(err);
        let Data = JSON.stringify(Users);
        console.log('Se pidio la lista de usuarios,actualmente contiene ' + Users.length + ' usuarios');
        res.send('{"users":' + Data + '}');
        
})
})

//ruta para busquedas
app.post('/userfind', urlencodedParser, function(req, res) {
    
    User.find(req.body).lean().exec(function (err, Users) {
        if (err) return console.error(err);
        let Data = JSON.stringify(Users);
        console.log(req.body)
        console.log('Se busco en la lista de usuarios,resultados: ' + Users.length);
        res.send('{"users":' + Data + '}');
        
})
})

//ruta para añadir una array con los usuarios
app.post('/userarray', urlencodedParser ,function(req, res) {
    
    req.body.map(element =>{
    
    const NewUser = new User();
 
    Object.assign (NewUser,element);
    
    NewUser.save(function (err, NewUser) {
        if (err) return console.error(err);
    })})

	res.send('Añadido array de ' + req.body.length + ' usuarios');
    console.log('Añadido array de ' + req.body.length + ' usuarios');
    
})

//ruta para añadir usuario
app.post('/user', urlencodedParser, function(req, res) {
    
    const NewUser = new User();
 
    Object.assign (NewUser,req.body);
    
    NewUser.save()
	
    .then(user => {
       console.log('Usuario añadido:')
       console.log(user)
	   res.send(user);
    })
    
    .catch(error => {} )
    
})

//ruta alternativa recibir _id en la url
app.delete('/user/:_id', function (req, res){
    
    User.remove({ _id: req.params._id }, function (err) {
        if (err) return handleError(err);
    });
    
	console.log('Usuario eliminado ID: ' + req.params._id);
	res.send('Usuario eliminado ID: ' + req.params._id);    
    
})

//ruta para eliminar varios usuarios
app.delete('/userdel', function (req, res){
    
    let Filtro = JSON.stringify(req.body);
    console.log(Filtro);
    console.log(res);
    User.remove(Filtro , function (err) {
        if (err) return handleError(err);
    });
    
	res.send(res);    
    
})

//ruta alternativa recibiendo el _id en la url
app.put('/user/:_id', urlencodedParser , function(req, res) {
    
    const Update = ({ 
        dni: req.body.dni,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email    
    });
    
    User.update({ _id: req.params._id }, Update , function (err) {
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
app.path('/useremail/_id', function(req, res) {
    
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