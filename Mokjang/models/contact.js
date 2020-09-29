const mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
	firstName: String,
	lastName:String,
	image: String,
	streetAddress: String,
	city: String,
	state: String,
	zip: String,
	registered: {type:Date, default:Date.now},
	created: {type:Date, default:Date.now},
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	],
	description: String
	
});
module.exports = mongoose.model("Contact", contactSchema);
