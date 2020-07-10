let express = require('express');
let app = express();

app.set('view engine', 'ejs');

// Adds color game direstory
app.use(express.static(__dirname + '/colorGame'));
console.log('Static Directory: ' + __dirname + '/colorGame');

app.get('/', function (req, res) {
	res.render('home');
});

app.get('/about', function (req, res) {
	res.render('about');
});

app.listen(process.env.PORT, function () {
	console.log('Server Has Started on port ' + process.env.PORT);
});