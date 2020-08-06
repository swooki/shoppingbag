const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament:String
});

var Cat = mongoose.model("Cat", catSchema);
// var george = new Cat({
// 	name:"George",
// 	age: 11,
// 	temperament: "Grouchy"
// });

// george.save(function(err, cat){
// 	if(err) {
// 		console.log("Something went wrong!");
// 	} else {
// 		console.log("We just save a cat to the DB");
// 		console.log(cat);
// 		console.log(george);
// 	}
// });

Cat.find({}, function(err, cats){
	if(err){
		console.log(err);
	} else {
		console.log("all the cats");
		console.log(cats);
	}
})
 