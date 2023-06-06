module.exports = {
  forget: function (app, dic) {
    app.get("/forget", function (req, res) {
      res.sendFile(dic + "/HTML/forget.html");
    });

    var forgetInfo;
    var email;
    var tel;
    var snaps = false;
    app.post("/forgetInfo", function (req, res) {
      snaps = false;
      forgetInfo = [];
      email = req.body.email;
      tel = req.body.tel;
      lowerEmail = email.toLowerCase();
      res.send();
    });
    app.get("/resFor", (req, res) => {
      var MongoClient = require("mongodb").MongoClient;
      var url = "mongodb://0.0.0.0:27017/languages";
      MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db("languages");
        try {
          if (email != "" && tel == "")
            forgetInfo = await dbo
              .collection("students")
              .find({ email: lowerEmail })
              .toArray();
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          if (email == "" && tel != "")
            forgetInfo = await dbo
              .collection("students")
              .find({ tel: tel })
              .toArray();
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          if (email != "" && tel != "") {
            forgetInfo = await dbo
              .collection("students")
              .find({ tel: tel, email: email })
              .toArray();
          }
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }

        let resFor = {
          forgetInfo: forgetInfo,
          snaps: snaps,
        };
        res.json(resFor);
      });
    });
  },
};
