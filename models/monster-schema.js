const mongoose = require ('mongoose');
//esquema de usuario

const monsterSchema = mongoose.Schema({
	
    monster_name: {type: String, min: 1, max: 15, unique: false, required : true},
	
	monster_description: {type: String, min: 1, max: 1000, unique: false},
	
	monster_id: {type: String, unique: true, required : true},
	
    rank: {type: Number, min: 0, max: 5, unique: false, required : true},
	
    statistics: {
		
		level: Number,
		exp: Number,
		
		strength : Number,
		constitution : Number,
		dexterity : Number,
		intelligence : Number,
		luck : Number,
		charisma : Number,
		
	},
	
	status: {
		
		condition: Number,
		
	},
	
    powers_66: { type : Array , "default" : [] },
	powers_33: { type : Array , "default" : [] },
	
	skills: { type : Array , "default" : [] },
	
	loot_always: { type : Array , "default" : [] },
	loot_50: { type : Array , "default" : [] },
	loot_25: { type : Array , "default" : [] },
	loot_01: { type : Array , "default" : [] },
	
    avatar: {type: Number , min: 0, max: 200, unique : false, required: true},

});

//exportamos el modulo
module.exports = mongoose.model('Monster', monsterSchema);