var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


var contacts = [
	{firstName:"Sungwook", lastName:"Kwon", city: "Columbus", image:"https://images.pexels.com/photos/3767353/pexels-photo-3767353.jpeg?auto=compress&cs=tinysrgb&h=350"},
	{firstName:"Soonduck", lastName:"Jang", city: "Dublin", image:"https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&h=350"},
	{firstName:"Haerim", lastName:"Kwon", city: "Dublin", image:"https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&h=350"},
	{firstName:"James", lastName:"Rim", city: "Elicott City", image:"https://images.pexels.com/photos/1484776/pexels-photo-1484776.jpeg?auto=compress&cs=tinysrgb&h=350"},
	{firstName:"Joonwon", lastName:"Lee", city: "Lewis Center", image:"https://images.pexels.com/photos/3289153/pexels-photo-3289153.jpeg?auto=compress&cs=tinysrgb&h=350"},
	{firstName:"Seungjin", lastName:"Park", city: "Seoul", image:"https://pixabay.com/get/55e2d5454f56b10ff3d8992ccf2934771438dbf85254784f71297cd79f49_340.jpg"}
];




app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/contacts", function(req, res){

	res.render("contacts", {contacts:contacts});
});

app.post("/contacts", function(req, res){
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var city = req.body.city;
	var image = req.body.image;
	contacts.push(
		{
			firstName:firstname, lastName: lastname, city: city, image: image
		}
	);
	res.redirect("/contacts");
})

app.get("/contacts/new", function(req, res){
	res.render("new");
});


app.listen(process.env.PORT, process.env.IP, function() {
	console.log("The SimpleContact Server has started at " + process.env.PORT);
});