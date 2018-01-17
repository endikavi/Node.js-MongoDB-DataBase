const mongoose = require ('mongoose');
//esquema de usuario

const userSchema = mongoose.Schema({
    dni: {type: String, min: 9, max: 9, unique: true},
    first_name: {type: String, min: 1, max: 15, unique: false},
    last_name: {type: String, min: 1, max: 15, unique: false},
    email: {type: String , unique : true}   
});

//exportamos el modulo
module.exports = mongoose.model('User', userSchema);