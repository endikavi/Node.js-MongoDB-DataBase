'use-strict'
const express = require('express');
const mongoose =  require ('mongoose');
const bodyParser = require('body-parser');
const mongodbRoute = 'mongodb://oskar:oskar@ds013664.mlab.com:13664/oskardb'
const {ObjectID} = require ('mongodb');
const app = express();
const router = require ('./routes');
var flash = require('connect-flash');
const port = 3001;

//Body-Parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.use(router);
app.use(flash());
/*MONGODB*/
mongoose.Promise = global.Promise
mongoose.connect(mongodbRoute, (err) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    app.listen(port, () => {
		console.log(`Servidor up en ${port}`);
	});
	var db = mongoose.connection;
    console.log(`Conexión con Mongo correcta. Acceso a ${db.name} correcto.`);
});