module.exports = {
  kids: function (app, dic) {
    app.get("/kids", function (req, res) {
      res.sendFile(dic + "/HTML/kids.html");
    });
    let result;
    let Case;
    let age;
    let ageN;
    var wrong;
    app.post("/kAge", (req, res) => {
      wrong = false;
      age = req.body.age;
      if (age == "") wrong = true;
      ageN = parseInt(age);
      if (ageN > 12 || ageN < 3) {
        result = "Sorry you can not regist on this course";
        Case = 1;
      } else {
        result = "You are welcome to confirm your child's registeration ";
        Case = 0;
      }
      res.send();
    });

    app.get("/res", (req, res) => {
      let result1 = result;

      let res1 = {
        result1: result1,
        Case: Case,
        wrong: wrong,
      };
      res.json(res1);
    });
  },
};
