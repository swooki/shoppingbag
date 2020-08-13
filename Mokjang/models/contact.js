const mongoose = require('mongoose');

// Schema for contact
var contactSchema = new mongoose.Schema({
	firstName: String,
	lastName:String,
	city: String,
	description: String,
	image: String
});
module.exports = mongoose.model("Contact", contactSchema);
