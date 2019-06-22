// require the dependencies
var cheerio = require("cheerio");
var request = require("request");
// require the models
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");
var Save = require("../models/Save");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        request("https://www.nytimes.com/", function (error, response, html) {

            // Load the HTML into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            var $ = cheerio.load(html);
