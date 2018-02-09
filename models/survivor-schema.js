const mongoose = require ('mongoose');
//esquema de usuario

const userSchema = mongoose.Schema({
    survivor_name: {type: String, min: 1, max: 15, unique: false, required : true},
    difyculty: {type: Number, min: 0, max: 3, unique: false, required : true},
    life_points: {type: Number, min: 1, max: 99999, unique: false, required : true,},
    mana_points: {type: Number, min: 1, max: 99999, unique : false},
    statistics: {
		
		strength : Number,
		constitution : Number,
		dexterity : Number,
		intelligence : Number,
		luck : Number,
		charisma : Number,
		
		determination : Number,
		knowledge : Number,
		kudos: Number,
		
		max_life_points: Number,
		max_mana_points: Number,
		carry_cap: Number,
		steps: Number
		
	},
    powers: { type : Array , "default" : [] },
	enchants: { type : Array , "default" : [] },
	skills: { type : Array , "default" : [] },
	inventory: { type : Array , "default" : [] },
    avatar: {type: Number , min: 0, max: 20, unique : false, required: true},
    status: { type : Array , "default" : [] },
	sleep: {type: Boolean , "default": false},
	thirst: {type: Number},
	fatigue: {type: Number},
	hungry: {type: Number},
	stress: {type: Number},
    level: {type: Number , min: 1, max: 125 ,"default" : 0},
	exp: {type : Number , min: 0, "default" : 0}
});

//exportamos el modulo
module.exports = mongoose.model('Survivor', survivorSchema);