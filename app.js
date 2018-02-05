// Node Modules //

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const validator = require('validator');

// Modules //



// Constants //
const jsonParser = bodyParser.raw();
const urlencodedParser = bodyParser.urlencoded({extended: false})
const mongodbRoute = 'mongodb://endika:endika@ds149865.mlab.com:49865/base_datos_aeg';
const port = 3001;
const app = express();
const router = express.Router();
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

const prueba = require('./routes/Prueba');
app.use('/prueba', prueba);

const user = require('./routes/user');
app.use('/user', user);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(urlencodedParser);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// route for pong //

app.get('/pong', function (req, res) {
    console.log('Pedido el pong')
    res.render('pong')
})

// route for client //

app.get('/', function (req, res) {
    console.log('Pedido el cliente');
    res.render('panel')
});

// catch 404 and forward to error handler //

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// cross-domain error fix //

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

// error handler //

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// exports //

module.exports = app;
