var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var mongoose = require("mongoose");
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
var Save = require("./models/Save.js");
var logger = require("morgan");
var cheerio = require("cheerio");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;
var axios = require("axios");
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
// Make public a static folder
app.use(express.static("./public"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true

// connect to database
// // Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scrapper", { useNewUrlParser: true });

// Set Handlebars.
var exphbs = require("express-handlebars");


var db = mongoose.connection;
db.on('error', function (err) {
    console.log('Mongoose Error', err);
});
db.once('open', function () {
    console.log("Mongoose connection is successful");
});
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views/layouts/partials")
}));

app.set("view engine", "handlebars");

// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, "views/index.handlebars"));
// });
 require("./routes/scrape.js")(app);

// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "views/index.handlebars"));
// });



console.log("walla");
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
