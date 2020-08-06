var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var databaseName = "Contact";
mongoose.connect("mongodb://localhost:27017/" + databaseName, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to " + databaseName))
.catch(error => console.log(error.message));

var contactSchema = new mongoose.Schema({
	firstName: String,
	lastName:String,
	city: String,
	description: String,
	image: String
});
var Contact = mongoose.model("Contact", contactSchema);

// Contact.create(
// 	{firstName:"Soonduck", lastName:"Jang", city: "Dublin", description: "Welcome to my family", image:"https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&h=350"}, function(err) {
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			console.log("a new contact has created.");
// 		}
// 	}	
// );


// var contacts = [
// 	{firstName:"Sungwook", lastName:"Kwon", city: "Columbus", image:"https://images.pexels.com/photos/3767353/pexels-photo-3767353.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 	{firstName:"Soonduck", lastName:"Jang", city: "Dublin", image:"https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 	{firstName:"Haerim", lastName:"Kwon", city: "Dublin", image:"https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 	{firstName:"James", lastName:"Rim", city: "Elicott City", image:"https://images.pexels.com/photos/1484776/pexels-photo-1484776.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 	{firstName:"Joonwon", lastName:"Lee", city: "Lewis Center", image:"https://images.pexels.com/photos/3289153/pexels-photo-3289153.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 	{firstName:"Seungjin", lastName:"Park", city: "Seoul", image:"https://pixabay.com/get/55e2d5454f56b10ff3d8992ccf2934771438dbf85254784f71297cd79f49_340.jpg"}
// ];




app.get("/", function(req, res) {
	res.render("landing");
});

// "Index" route
app.get("/contacts", function(req, res){
	Contact.find({}, function(err, allContacts){
		if(err) {
			console.log(err);
		} else {
			res.render("index", {contacts:allContacts});
		}
	});
});

// "Create" route
app.post("/contacts", function(req, res){
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var city = req.body.city;
	var desc = req.body.description;
	var image = req.body.image;
	var newContact = {firstName:firstname, lastName: lastname, city: city, description:desc, image: image};
	
	Contact.create(newContact, function(err, newlyCreated){
		if(err) {
			console.log(err);
		} else {
			res.redirect("/contacts");
		}
	});
})

// "New" route
app.get("/contacts/new", function(req, res){
	res.render("new");
});

// "Show" /contacts/:id route
app.get("/contacts/:id", function(req, res){
	Contact.findById(req.params.id, function(err, foundContact){
		if(err) {
			console.log(err);
		} else {
			res.render("show", {contact:foundContact});
		}
	});
});

// 

// 

app.listen(process.env.PORT, process.env.IP, function() {
	console.log("The SimpleContact Server has started at " + process.env.PORT);
});