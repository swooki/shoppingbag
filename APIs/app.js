var express = require('express');
var app = express();

var needle = require('needle');

app.set('view engine', 'ejs');

app.get('/', function(req, res){
		res.render('home');
});

app.get('/results', function(req, res){
	var query = req.query.search;
	var url = 'http://www.omdbapi.com/?apikey=8eb83f0f&s=' + query + '&page=10'
	console.log("URL:" + url);
	needle.get( url, { json: true }, function(err, resp) {
		
		if(err) {
			console.log('Something went wrong!');
			console.log(err);
		}else {
			if (resp.statusCode == 200) {
				var data = resp.body["Search"];
				res.render("results", {data:data});
			}
		}
	});
	
});


app.listen(process.env.PORT, function(){
	console.log("Server has started at " + process.env.PORT);
})