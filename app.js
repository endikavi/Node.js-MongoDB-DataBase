// Node Modules //

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

// Modules //

const User = require ('./modules/user-schema');

// Constants //
const jsonParser = bodyParser.raw();
const urlencodedParser = bodyParser.urlencoded({extended: false})
const index = require('./routes/index');
const users = require('./routes/users');
const prueba = require('./routes/Prueba');
const mongodbRoute ='mongodb://endika:endika@ds149865.mlab.com:49865/base_datos_aeg';
const port = 8080;
const app = express();
const mongodbOptions = {
	useMongoClient: true,
	socketTimeoutMS: 0,
	keepAlive: true,
	reconnectTries: 30
};

// MongoDB Connection //

mongoose.Promise = global.Promise
const db = mongoose.connect(mongodbRoute, mongodbOptions, (err) => {
	if (err) {
		return console.log(`Error al conectar a la base de datos: ${err}`)
	}
	app.listen(port, () => {
		console.log(`Servidor up en ${port}`);
	});
	console.log(`Conexión correcta.`)
});

// view engine setup //

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(urlencodedParser);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware para validacion //

app.post('/user', urlencodedParser, function (req, res, next) {

  console.log('Request Type:', req.method);
  next();
    
});

// route for pong //

app.get('/pong', function (req ,res){
    console.log('Pedido el pong')
    res.render('pong')})

// route for client //

app.get('/', function (req ,res){
    console.log('Pedido el cliente');
    res.render('panel')});

// route to obtain all users //

app.get('/user', function(req, res) {
    User.find().lean().exec(function (err, Users) {
        if (err) return console.error(err);
        console.log('Se pidio la lista de usuarios,actualmente contiene ' + Users.length + ' usuarios');
        res.send('{"users":' + JSON.stringify(Users) + '}');        
})})
    
// find by id    
app.get('/user/:_id', function(req, res) {
    
    User.find({ _id: req.params._id }).lean().exec(function (err, Users) {
        if (err) return console.error(err);
        console.log('Se pidio la lista de usuarios,actualmente contiene ' + Users.length + ' usuarios');
        res.send('{"users":' + JSON.stringify(Users) + '}');        
})   
})

// route for searchs //

app.post('/userfind', urlencodedParser, function(req, res) {    
    User.find(req.body).lean().exec(function (err, Users) {
        if (err) return console.error(err);
        console.log(req.body)
        console.log('Se busco en la lista de usuarios,resultados: ' + Users.length);
        res.send('{"users":' + JSON.stringify(Users) + '}');        
})
})

// route for specific //

app.get('/userfindactive', urlencodedParser, function(req, res) {    
    User.find({active : true}).lean().exec(function (err, Users) {
        if (err) return console.error(err);
        console.log(req.body)
        console.log('Se busco en la lista de usuarios los activos,resultados: ' + Users.length);
        res.send('{"users":' + JSON.stringify(Users) + '}');        
})
})    
    
// route to add users //

app.post('/usermany', urlencodedParser, function(req, res) {
  
		req.body.map(element =>{
    	const NewUser = new User();
    	Object.assign (NewUser,element);
    	NewUser.save()
        .then(user => {
				res.send(user);
        		console.log('Añadidos usuarios');
			})
        .catch(error => {} )
;})})
    
app.post('/user', urlencodedParser, function(req, res) {
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

// route to delete users by id in the url //

app.delete('/user/:_id', function (req, res){ 
    User.remove({ _id: req.params._id }, function (err) {
        if (err) return handleError(err);
    });
	console.log('Usuario eliminado ID: ' + req.params._id);
	res.send('Usuario eliminado ID: ' + req.params._id);      
})

//ruta para eliminar varios usuarios

app.delete('/userdel', function (req, res){
    array = [];
    let obj = JSON.stringify(req.body);
	JSON.parse(obj, function (x,y){
	let z = " : "	
	let newobj = (x + z + y);
	array.push (JSON.parse(JSON.stringify((newobj))));	
	})
	array.pop();
    console.log(array);
  
	array.map(element =>{
    	User.remove(element , function (err) {
			if (err) return handleError(err);
		});
	});
	res.send(array); 
    
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

// catch 404 and forward to error handler //

app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// cross-domain error fix //

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

// error handler //

app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// exports //

module.exports = app;