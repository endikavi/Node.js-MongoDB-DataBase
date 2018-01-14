//importar paquetes y configurar conexión a mongodb


'use-strict'
const express = require('express');
const mongoose =  require ('mongoose')
const bodyParser= require ('body-parser')
const mongodbRoute = 'string de conexión a mongodb'

const app = express();
const port = 3001;
app.use (bodyParser.urlencoded({ extended: false}));
app.use (bodyParser.json());

/*MONGODB*/
mongoose.Promise = global.Promise
mongoose.connect(mongodbRoute, (err) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    app.listen(port, () => {
		console.log(`Servidor up en ${port}`);
	});
    console.log(`Conexión con Mongo correcta.`)
})

//Código para evitar error cross-domain en el navegador

app.use (bodyParser.urlencoded({ extended: false}))
app.use (bodyParser.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
