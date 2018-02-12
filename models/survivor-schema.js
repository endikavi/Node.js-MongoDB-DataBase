const mongoose = require ('mongoose');
//esquema de usuario

const survivorSchema = mongoose.Schema({
	
    survivor_name: {type: String, min: 1, max: 15, unique: false, required : true},
	
	survivor_id: {type: String, unique: true, required : true},
	
    difyculty: {type: Number, min: 0, max: 3, unique: false, required : true},
	
    statistics: {
		
		level: {type: Number , min: 1, max: 125 ,"default" : 0},
		exp: {type : Number , min: 0, "default" : 0},
		
		strength : Number,
		constitution : Number,
		dexterity : Number,
		intelligence : Number,
		luck : Number,
		charisma : Number,
		
		knowledge : Number,
		
		carry_cap: Number,
		steps: Number
		
	},
	
	karma: {
		
		determination : Number,
		kudos: Number,
		
	},
	
	status: {
		
		condition: Number,
	
		thirst:  Number,
		fatigue: Number,
		hungry: Number,
		stress: Number,
		
		actual_life_points: Number,
		actual_mana_points: Number,	
		
	},
	
    powers: { type : Array , "default" : [] },
	
	diseases: { type : Array , "default" : [] },
	
	skills: { type : Array , "default" : [] },
	
	inventory: { type : Array , "default" : [] },
	
    avatar: {type: Number , min: 0, max: 20, unique : false, required: true},

});

//exportamos el modulo
module.exports = mongoose.model('Survivor', survivorSchema);