// My AppsDublinWeather
// App ID
// SssqVC67
// Client ID (Consumer Key)
// dj0yJmk9ZXc2d1EwQzZuZkFTJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWQz
// Client Secret (Consumer Secret)
// a578df7dde37f107f3b84c1f62986ccbb91bbeb5
// You can use Client ID and Client Secret to access Yahoo APIs protected by OAuth.

// Application Name
// DublinWeather
// Description(Optional)
// Home Page URL(Optional)
// Redirect URI(s)(Required)
// https://tranquil-lake-95794.herokuapp.com/about

// Please specify any additional redirect uris.
// API Permissions
// Select private user data APIs that your application needs to access.


var OAuth = require('oauth');
var header = {
    "X-Yahoo-App-Id": "your-app-id"
};
var request = new OAuth.OAuth(
    null,
    null,
    'dj0yJmk9ZXc2d1EwQzZuZkFTJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWQz',
    'a578df7dde37f107f3b84c1f62986ccbb91bbeb5',
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
);
request.get(
    'https://weather-ydn-yql.media.yahoo.com/forecastrss?location=dublin,oh&format=json',
    null,
    null,
    function (err, data, result) {
        if (err) {
            console.log(err);
        } else {
			var parsedData = JSON.parse(data)
            console.log(parsedData["forecasts"]);
        }
    }
);