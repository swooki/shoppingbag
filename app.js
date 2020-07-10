let express = require('express');
let app = express();

app.set("view engine", "ejs");

// Adds color game direstory
app.use(express.static(__dirname + "/ColorGame"));

app.get("/", function(req, res){
    res.render("home");
});

app.get("/about", function (req, res) {
  res.render("about");
});
app.listen(3000);
