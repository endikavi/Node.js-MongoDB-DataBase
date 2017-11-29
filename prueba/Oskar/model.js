const mongoose = require('mongoose');
//Creamos el Schema
var adminSchema = new mongoose.Schema({ 
	name: String,
	username: String,
	email: String,
	avatar: String, 
	active: Boolean 
});
//Exportamos el modelo
module.exports = mongoose.model('Admin', adminSchema)
