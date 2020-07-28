


var OAuth = require('oauth');
var header = {
    "X-Yahoo-App-Id": "your-app-id"
};
var request = new OAuth.OAuth(
    null,
    null,
    '{Client ID}',
    '{Client Secret}',
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