const mongoose = require ('mongoose');
//esquema de usuario

const UserAccountSchema = mongoose.Schema({
    
    email: {type: String , unique : true , required : true} ,
    username: {type: String, min: 1, max: 15, unique: true , required : true} ,
	password: {type: String , unique : false , required : true},
	time: {type: String , unique : false , required : true} ,
	verified: {type: Boolean , unique : false , default : false} ,
	admin: {type: Boolean , unique : false , default : false} ,
    premium: {type: Boolean , unique : false , default : false} ,
    
    SurvivorOne: {type: String, min: 1, max: 15, unique: false , required : false} ,
    SurvivorTwo: {type: String, min: 1, max: 15, unique: false , required : false} ,
    SurvivorThree: {type: String, min: 1, max: 15, unique: false , required : false} ,
	
	packs: { type : Array , "default" : [] }
	  
});

//exportamos el modulo
module.exports = mongoose.model('gameUser', UserAccountSchema);