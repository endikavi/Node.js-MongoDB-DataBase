const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose =  require ('mongoose')


const jsonParser = bodyParser.raw();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


let index = require('./routes/index');
let users = require('./routes/users');
let prueba = require('./routes/Prueba');
const mongodbRoute = 'mongodb://endika:endika@ds149865.mlab.com:49865/base_datos_aeg';
const port = process.env.PORT || 8080;
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
mongoose.connect(mongodbRoute,options, (err) => {
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.get('/users', users);
//app.get('/prueba', prueba);

//ruta para ver usuarios
app.get('/users', function(req, res){
console.log('Informacion de usuarios');
res.send('Informacion de usuarios');})

//ruta para resetear los usuarios
app.get('/usersreset', function(req, res){
console.log('Usuarios recuperados');
res.send('Usuarios recuperados');})

//ruta para actualizar usuario
app.post('/users', urlencodedParser,function(req, res){
console.log('Usuario añadido: ID: ' + req.body.id +" Nombre: " + req.body.first_name +" Apellido: " + req.body.last_name +" Email: " + req.body.email);
res.send('Usuario añadido: ID: ' + req.body.id +" Nombre: " + req.body.first_name +" Apellido: " + req.body.last_name +" Email: " + req.body.email);})

//ruta para eliminar usuario
app.delete('/users', urlencodedParser,function(req, res){
console.log('Usuario eliminado: ID ' + req.body.id);
res.send('Usuario eliminado: ID ' + req.body.id);})

//ruta para añadir usuario
app.put('/users', function(req, res){
console.log('Usuario actualizado: ID: ' + req.body.id +" Nombre: " + req.body.first_name +" Apellido: " + req.body.last_name +" Email: " + req.body.email);
res.send('Usuario actualizado: ID: ' + req.body.id +" Nombre: " + req.body.first_name +" Apellido: " + req.body.last_name +" Email: " + req.body.email);})

//ruta para modificar el email de un usuario
app.post('/usersemail', function(req, res){
console.log('email actualizado: ' + req.body.email);
res.send('email actualizado: ' + req.body.email);})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//cross-domain error fix
app.use (bodyParser.urlencoded({ extended: false}))
app.use (bodyParser.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
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
