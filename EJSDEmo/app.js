var express  = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var friends = [ "Sung","Soon","Wonkang","Haewon","Haerim"];


app.get('/', function(req, res){
	res.render("home");
});

app.get('/posts', function(req, res){
	var posts = [ 
		{title:"post 1", author:"kwons"},
		{title:"post 2", author:"kwons2"},
		{title:"post 3", author:"kwons3"},
		{title:"post 4", author:"kwons4"}
	];
	res.render("posts", {posts: posts});
})

app.get('/fallinlovewith/:thing/:times', function(req, res){
	var thing = req.params.thing;
	var intTimes = parseInt(req.params.times);
	res.render("love", {thingVar: thing, times: intTimes});
})

app.get('/friends', function(req, res){
	res.render("friends", {friends:friends});
});

app.post('/addfriend', function(req, res){
	var newFriend = req.body.newfriend;
	friends.push(newFriend);
	res.redirect("/friends");
});

app.listen(process.env.PORT, process.env.IP, function() {
	console.log("Server has started at " +  process.env.PORT);
})
