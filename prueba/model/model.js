const mongoose = require('mongoose');
//Creamos el Schema
var pacientesSchema = new mongoose.Schema({ 
	nombre: String,
	apellido: String,
    numero: Number,
	email: String,
	foto: String, 
	activo: Boolean,
    cita: Number,
    nºcita: Number,
    datos: String
});
//Exportamos el modelo
module.exports = mongoose.model('Pacientes', pacientesSchema)
