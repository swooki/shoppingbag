var needle = require('needle');

needle.get('http://www.kpccoh.org',  function(err, resp) {
	if(err) {
		console.log('Something went wrong!');
		console.log(err);
	}else {
		if (resp.statusCode == 200) {
			console.log('Found the website!');
		}
		console.log(resp.body);
	}
});