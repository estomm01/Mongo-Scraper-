// require the dependencies
var cheerio = require("cheerio");
var request = require("request");
// require the models
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");
var Save = require("../models/Save");
var axios = require("axios");


module.exports = function (app) {
  app.get("/scrape", function (req, res) {
    //console.log("test");
    // First, we grab the body of the html with axios
    axios.get("http://www.buzzfeednews.com/").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      var results = [];
      console.log(results);

      $("article").each(function (i, element) {
        var result = {};

        result.summary = $(this)
          .children("a")
          .children(".newsblock-story-card__info")
          .children(".newsblock-story-card__description")
          .text()
        result.byline = $(this)
          .children("a")
          .children(".newsblock-story-card__info")
          .children(".newsblock-story-card__title")
          .text()
        result.title = $(this)
          .children("a")
          .children(".newsblock-story-card__info")
          .children(".newsblock-story-card__title")
          .text()
        result.link = $(this)
          .children("a")
          .attr("href");
        console.log(result)
        // if (result.link !== "" || result.title !== "") {
        //   results.push
        // }
        // results.push(result);
      });

      // Create a new Article using the `result` object built from scraping
      Article.create(results)
        .then(function (dbArticle) {
          // View the added result in the console
          //     console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
      // Send a message to the client
      res.send("Scrape Complete");
    });

  });
  // Route for getting all Articles from the db
  app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function (dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.get("/articles/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function (dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // get route to return all saved articles
  app.get("/saved/all", function (req, res) {
    save.find({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function (dbNote) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(db);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // post route to save article
  app.post("/save", function (req, res) {
    var result = {};
    result.id = req.body._id;
    result.summary = req.body.summary;
    result.byline = req.body.byline;
    result.title = req.body.title;
    result.link = req.body.link;
    // Save these results in an object that we'll push into the results array we defined earlier
    var entry = new Save(result);
    // Now, save that entry to the db
    entry.save(function (err, doc) {
      // Log any errors
      if (err) {
        console.log(err);
        res.json(err);
      }
      // Or log the doc
      else {
        res.json(doc);
      }
    });
    //res.json(result);
  });

  // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
  // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
  // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query

  //           db.Note.create(req.body)
  //       .then(function (dbNote) {
  //         // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
  //         // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
  //         // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
  //         return db.Article.findOneAndUpdate({ _id: req.params.id }, {title: req.params.title}, { note: dbNote._id }, { new: true });
  //      });


  // route to delete saved articles
  app.delete("/delete", function (req, res) {
    var result = {};
    result._id = req.body._id;
    Save.findOneAndRemove({
      '_id': req.body._id

    }, function (err, doc) {
      // Log any errors
      if (err) {
        console.log("error:", err);
        res.json(err);
      }
      // Or log the doc
      else {
        res.json(doc);
      }
    });
  });

  app.get("/notes/:id", function (req, res) {
    if (req.params.id) {
      Note.find({
        "article_id": req.params.id
      })
        .exec(function (error, doc) {
          if (error) {
            console.log(error)
          } else {
            res.send(doc);
          }
        });
    }
  });

  // Create a new note or replace an existing note
  app.post("/notes", function (req, res) {
    if (req.body) {
      var newNote = new Note(req.body);
      newNote.save(function (error, doc) {
        if (error) {
          console.log(error);
        } else {
          res.json(doc);
        }
      });
    } else {
      res.send("Error");
    }
  });
  // find and update the note
  app.get("/notepopulate", function (req, res) {
    Note.find({
      "_id": req.params.id
    }, function (error, doc) {
      if (error) {
        console.log(error);
      } else {
        res.send(doc);
      }
    });
  });

  // delete a note

  app.delete("/deletenote", function (req, res) {
    var result = {};
    result._id = req.body._id;
    Note.findOneAndRemove({
      '_id': req.body._id
    }, function (err, doc) {
      // Log any errors
      if (err) {
        console.log("error:", err);
        res.json(err);
      }
      // Or log the doc
      else {
        res.json(doc);
      }
    });
  });
}
