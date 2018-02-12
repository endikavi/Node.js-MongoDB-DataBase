const mongoose = require ('mongoose');
//esquema de usuario

const landSchema = mongoose.Schema({
	
    land_name: {type: String, min: 1, max: 15, unique: false},
	
	land_description: {type: String, min: 1, max: 1000, unique: false},
	
	land_id: {type: String, unique: true, required : true},
	
    rank: {
		
		min_level: Number,
		special_need: array,
		
	},
	
    statistics: {

		max_encounter : Number,
		exp : Number,
		weather : Number,
		
	},
	
	encounter_75: { type : Array , "default" : [] },
	encounter_25: { type : Array , "default" : [] },
	boos_encounter: { type : Array , "default" : [] },
	
    skin: {type: Number , min: 0, max: 200, unique : false, required: true},

});

//exportamos el modulo
module.exports = mongoose.model('land', landSchema);