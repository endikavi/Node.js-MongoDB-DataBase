
//importar paquetes y configurar conexión a mongodb


'use-strict'
const express = require('express');
const mongoose =  require ('mongoose')
const bodyParser= require ('body-parser')
const mongodbRoute = 'mongodb://endika:endika@ds149865.mlab.com:49865/base_datos_aeg'
const app = express();
const port = 3001;
app.use (bodyParser.urlencoded({ extended: false}));
app.use (bodyParser.json());
const rutas = require ('./rutas/prueba.js');
const view = require ('./view/vista.html');


//app.get('./view/vista.html');


var modulo = require('./model/modulo.js');
modulo.titulo();



/*MONGODB*/
mongoose.Promise = global.Promise
mongoose.connect(mongodbRoute,{useMongoClient: true}, (err) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    app.listen(port, () => {
		console.log(`Servidor up en ${port}`);
	});
    console.log(`Conexión con Mongo correcta.`)
});

// vista

app.use(express.static('./view' + '/public'));


