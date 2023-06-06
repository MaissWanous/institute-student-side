module.exports = {
  English: function (app, dic) {
    var selected_level = "";
    app.post("/En", function (req, res) {
      selected_level = "";
      if (req.body.level) {
        selected_level = req.body.level;
        const signUp = require("./signUp.js");
        signUp.register(selected_level, "English");
      }
      res.send();
    });
    app.get("/link2", function (req, res) {
      var obj = {
        selected_level: selected_level,
      };
      const signUp = require("./signUp.js");
      signUp.register(selected_level, "English");
      res.json(obj);
    });
    app.get("/English", function (req, res) {
      res.sendFile(dic + "/HTML/English.html");
    });
  },
};
