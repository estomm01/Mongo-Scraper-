

// var path = require("path");

// module.exports = function (app) {
//   app.get("/", function (req, res) {
//     res.render("home.handlebars");
//     //res.json({dummy: "test"});
//   });

//   app.get("/saved/all", function (req, res) {
//     res.render("saved");
//   });

//   app.get("*", function (req, res) {
//     res.render("main.handlebars");
//   });
// }

// var path = require("path");

// module.exports = function (app) {
//      app.get("/", function (req, res) {

//         // db find all mongo
//          res.render("home.handlebars");
//           // end of db find all
//     });

//     app.get("/saved/all", function (req, res) {
//         res.render("saved");
//     });
//     app.get("/scrape", function (req, res) {
//         console.log("test");
//         // First, we grab the body of the html with axios
//         axios.get("http://www.buzzfeednews.com/").then(function (response) {
//           // Then, we load that into cheerio and save it to $ for a shorthand selector
//           var $ = cheerio.load(response.data);
//           var results = [];
//           console.log(results);

//           $("article").each(function (i, element) {
//             var result = {};

//             result.summary = $(this)
//               .children("a")
//               .children(".newsblock-story-card__info")
//               .children(".newsblock-story-card__description")
//               .text()
//             result.byline = $(this)
//               .children("a")
//               .children(".newsblock-story-card__info")
//               .children(".newsblock-story-card__title")
//               .text()
//             result.title = $(this)
//               .children("a")
//               .children(".newsblock-story-card__info")
//               .children(".newsblock-story-card__title")
//               .text()
//             result.link = $(this)
//               .children("a")
//               .attr("href");
//             console.log(result)
//             // if (result.link !== "" || result.title !== "") {
//             //   results.push
//             // }
//             // results.push(result);
//           });

//           // Create a new Article using the `result` object built from scraping
//           Article.create(results)
//             .then(function (dbArticle) {
//               // View the added result in the console
//               //     console.log(dbArticle);
//             })
//             .catch(function (err) {
//               // If an error occurred, log it
//               console.log(err);
//             });
//           // Send a message to the client
//           res.send("Scrape Complete");
//         });

//       });
//     // app.get("*", function (req, res) {
//     //     res.render("main.handlebars");
//     // });
// }
