
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');

// Import Models 
const Contact = require('./models/contact');
const Prayer = require('./models/prayer');
const Comment = require('./models/comment');

// Seed database
const seedDB = require('./seeds');

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


//==  S E E D I N G  ===========================================================
seedDB();

//==  L A N D I N G  ===========================================================
app.get("/", function(req, res) {
	res.render("landing");
});

//==  C O N T A C T  ===========================================================
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

// "New" route
app.get("/contacts/new", function(req, res){
	res.render("contacts/new");
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


//==  P R A Y E R  =============================================================
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
	Prayer.findById(req.params.id).populate("comments").exec(
		function(err, found){
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

//==  P R A Y E R  C O M M E N T  ==============================================

// "New" route
app.get("/prayers/:id/comments/new", function(req, res){
	Prayer.findById(req.params.id, function(err, prayer){
		 if(err) {
		 	res.redirect("/prayers/" + req.params.id);
		 } else {
			res.render("comments/new", {prayer:prayer});
		 }
	})
});

// "Create" route
app.post("/prayers/:id/comments", function(req, res){
	Prayer.findById(req.params.id, function(err, prayer){
		 if(err) {
		 	res.redirect("/prayers/" + req.params.id);
		 } else {
			 // Create a new comment 
			 Comment.create(req.body.comment, function(err, comment){
				 if(err) {
					 console.log(err);
				 } else {
					prayer.comments.push(comment);
					prayer.save(); 
					res.redirect("/prayers/" + prayer._id);
				 }
			 } )
		 }
	})
})


// Listener 
app.listen(process.env.PORT, process.env.IP, function() {
	console.log("The Mokjang Server has started at " + process.env.PORT);
});