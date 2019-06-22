// require the dependencies
var cheerio = require("cheerio");
var request = require("request");
// require the models
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");
var Save = require("../models/Save");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("http://www.echojs.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
