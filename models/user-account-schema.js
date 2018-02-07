const mongoose = require ('mongoose');
//esquema de usuario

const gameUserSchema = mongoose.Schema({
    
    email: {type: String , unique : true , required : true},
    username: {type: String, min: 1, max: 15, unique: true , required : true},
    Survivors: {
        SurvivorOne: String ,
        SurvivorTwo: String ,
        SurvivorThree: String     
    },
    password: {type: String , unique : false , required : true}
    
});

//exportamos el modulo
module.exports = mongoose.model('gameUser', gameUserSchema);