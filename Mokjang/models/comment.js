const mongoose = require('mongoose');

// Schema for contact
var commentSchema = new mongoose.Schema({
	text: String,
	author:String
});
module.exports = mongoose.model("Comment", commentSchema);
