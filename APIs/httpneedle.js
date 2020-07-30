var needle = require('needle');

needle.get('http://www.omdbapi.com/?s=ohio&apikey=8eb83f0f',  function(err, resp) {
	if(err) {
		console.log('Something went wrong!');
		console.log(err);
	}else {
		if (resp.statusCode == 200) {
			console.log('Found the website!');
			console.log(resp.body);
		}
	}
});