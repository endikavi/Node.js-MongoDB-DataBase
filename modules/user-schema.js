const mongoose = require ('mongoose');
//esquema de usuario

const userSchema = mongoose.Schema({
    dni: {type: String, min: 8, max: 11, unique: true},
    first_name: {type: String, min: 1, max: 15, unique: false},
    last_name: {type: String, min: 1, max: 15, unique: false},
    email: {type: String , unique : true},
    name: {type: String, min: 1, max: 15, unique: false},
    username: {type: String, min: 1, max: 15, unique: false},
    avatar: {type: String , unique : false},
    active: {type: Boolean , unique : false},
    comment: {type: String , unique : false ,required : false}
});

//exportamos el modulo
module.exports = mongoose.model('User', userSchema);