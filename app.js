let express = require('express');
let app = express();

app.set('view engine', 'ejs');

// Adds color game direstory
// app.use(express.static(__dirname + '/colorGame'));
// console.log('Static Directory: ' + __dirname + '/colorGame');

app.use(express.static(__dirname + '/colorGame'));
app.use("/ToDoList", express.static(__dirname + '/ToDoList'));
app.use("/PatatabClone", express.static(__dirname + '/PatatabClone'));

app.get('/', function (req, res) {
	res.render('home');
});

app.get('/about', function (req, res) {
	res.render('about');
});

// adds url pattern /repeat/:outputString/:repeat
app.get('/repeat/:string/:repeat', function(req, res){
	var outputString = '';
	var repeatNum = parseInt(req.params.repeat);
	for(var i=0; i<repeatNum; i++){ 
		outputString += (req.params.string + " "); 
	}
	res.send(outputString);
});

app.get("*", function(req, res){
	res.send("You are a star!");
});

app.listen(process.env.PORT, function () {
	console.log('Server Has Started on port ' + process.env.PORT);
});