module.exports = {
  check2: function (app, dic) {
    app.get("/check2", function (req, res) {
      res.sendFile(dic + "/HTML/check2.html");
    });
    var check;
    var code;
    var result = '';
    const axios = require("axios");
    app.post("/check2", function (req, res) {
      axios.get("http://localhost:8080/cheee").then(response => {

        console.log(response.data);
      });
      code =
        check = parseInt(req.body.code);

      if (code == check)
        result = "Your registration is complete";
      else
        result = "The code you entered is wrong";

      res.send();
    });

    app.get("/che", (req, res) => {
      let result1 = result;

      let res1 = {
        result1: result1
      };
      res.json(res1);
    });
  },
};
