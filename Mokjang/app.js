
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// Connect to MongoDB  
var databaseName = "Mokjang";
mongoose.connect("mongodb://localhost:27017/" + databaseName, {
  	useNewUrlParser: true,
  	useUnifiedTopology: true,
	useFindAndModify: false
})
.then(() => console.log("Connected to " + databaseName))
.catch(error => console.log(error.message));

// Schema for contact
var contactSchema = new mongoose.Schema({
	firstName: String,
	lastName:String,
	city: String,
	description: String,
	image: String
});
var Contact = mongoose.model("Contact", contactSchema);

// Schema for prayer
var prayerSchema = new mongoose.Schema({
	title: String,
	prayer:String,
	image: String,
	created: {type:Date, default:Date.now}
});
var Prayer = mongoose.model("Prayer", prayerSchema);



// Contact.create(
// 	{firstName:"Soonduck", lastName:"Jang", city: "Dublin", description: "Welcome to my family", image:"https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&h=350"}, function(err) {
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			console.log("a new contact has created.");
// 		}
// 	}	
// );


app.get("/", function(req, res) {
	res.render("landing");
});

// "Index" route
app.get("/contacts", function(req, res){
	Contact.find({}, function(err, allContacts){
		if(err) {
			console.log(err);
		} else {
			res.render("contacts/index", {contacts:allContacts});
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
	res.render("contacts/new");
});

// "Show" /contacts/:id route
app.get("/contacts/:id", function(req, res){
	Contact.findById(req.params.id, function(err, foundContact){
		if(err) {
			console.log(err);
		} else {
			res.render("contacts/show", {contact:foundContact});
		}
	});
});


//==============================================================================
	// title: String,
	// prayer:String,
	// image: String,
	// created: {type:Date, default:Date.now}

// "Index" route
app.get("/prayers", function(req, res){
	Prayer.find({}, function(err, allPrayers){
		if(err) {
			console.log(err);
		} else {
			res.render("prayers/index", {prayers:allPrayers});
		}
	});
});

// "New" route
app.get("/prayers/new", function(req, res){
	res.render("prayers/new");
});


// "Create" route
app.post("/prayers", function(req, res){
	req.body.prayer.prayer = req.sanitize(req.body.prayer.prayer);
	Prayer.create(req.body.prayer, function(err, newlyCreated){
		if(err) {
			res.render("new");
		} else {
			res.redirect("/prayers");
		}
	});
})

// "Show" route
app.get("/prayers/:id", function(req, res){
	Prayer.findById(req.params.id, function(err, found){
		if(err) {
			res.redirect("/prayers");
		} else {
			res.render("prayers/show", {prayer:found});
		}
	});
});

// "Edit" route
app.get("/prayers/:id/edit", function(req, res){
	Prayer.findById(req.params.id, function(err, found){
		if(err) {
			res.redirect("/prayers");
		} else {
			res.render("prayers/edit", {prayer:found});
		}
	});
});

// "Update" route
app.put("/prayers/:id", function(req, res){
	req.body.prayer.prayer = req.sanitize(req.body.prayer.prayer);
	Prayer.findByIdAndUpdate (req.params.id, req.body.prayer, function(err, updated){
		 if(err) {
		 	res.redirect("/prayers");
		 } else {
		 	res.redirect("/prayers/" + req.params.id);
		 }
	});
});

// "Delete" route
app.delete("/prayers/:id", function(req, res){
	Prayer.findByIdAndRemove (req.params.id, function(err){
		 if(err) {
		 	res.redirect("/prayers");
		 } else {
		 	res.redirect("/prayers");
		 }
	});
});


// Listener 
app.listen(process.env.PORT, process.env.IP, function() {
	console.log("The Mokjang Server has started at " + process.env.PORT);
});