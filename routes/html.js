var path = require("path");

module.exports = function (app) {
     app.get("/", function (req, res) {
         res.sendFile(path.join(__dirname, "/../views/index.html"));
          //res.json({dummy: "test"});
    });

    app.get("/saved/all", function (req, res) {
        res.sendFile(path.join(__dirname, "/../views/saved.html"));
    });

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "/../views/index.html"));
    });
}
