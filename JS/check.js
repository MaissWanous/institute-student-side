module.exports = {
  check: function (app, dic) {
    app.get("/check", function (req, res) {
      res.sendFile(dic + "/HTML/check.html");
    });

    var email;

    app.post("/check", async function (req, res) {
      email = req.body.email;
      code = Math.floor(Math.random() * 1000000);
      console.log(code);

      res.sendFile(dic + "/HTML/check2.html");

    });


  },
};
