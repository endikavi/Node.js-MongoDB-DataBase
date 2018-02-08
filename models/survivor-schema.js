const mongoose = require ('mongoose');
//esquema de usuario

const userSchema = mongoose.Schema({
    survivor_name: {type: String, min: 8, max: 11, unique: true, required : true},
    difyculty: {type: String, min: 1, max: 15, unique: false, required : false},
    life_points: {type: String, min: 1, max: 15, unique: false, required : false,},
    mana_points: {type: String , unique : true},
    estadisticas: {type: String, min: 1, max: 15, unique: false},
    powers: {type: String, min: 1, max: 15, unique: false},
    avatar: {type: String , unique : false},
    status: {type: Boolean , unique : false},
    level: {type: String , unique : false ,required : false}
});

//exportamos el modulo
module.exports = mongoose.model('User', userSchema);