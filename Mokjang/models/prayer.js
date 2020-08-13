const mongoose = require('mongoose');

var prayerSchema = new mongoose.Schema({
	title: String,
	prayer:String,
	image: String,
	created: {type:Date, default:Date.now},
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	]
	
});
module.exports = mongoose.model("Prayer", prayerSchema);

   // comments: [
   //    {
   //       type: mongoose.Schema.Types.ObjectId,
   //       ref: "Comment"
   //    }
   // ]