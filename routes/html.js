var path = require("path");

module.exports = function (app) {
     app.get("/", function (req, res) {
         res.render("home.handlebars");
          //res.json({dummy: "test"});
    });

    app.get("/saved/all", function (req, res) {
        res.render("saved");
    });

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "/views/layouts/main.handlebars"));
    });
}
