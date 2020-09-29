const mongoose = require('mongoose');

// Schema for contact
var phoneSchema = new mongoose.Schema({
	name: String,
	number:String
});
module.exports = mongoose.model("Phone", phoneSchema);
