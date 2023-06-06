const { result, join } = require("lodash");

module.exports = {
  test: function (app, dic) {
    app.get("/test", function (req, res) {
      res.sendFile(dic + "/HTML/test.html");
    });
    var result;
    var cnt = 0;
    var answer = [];
    var first = [];
    var final = [];
    var checkResult = [];
    var ans = [];
    app.post("/test1", function (req, res) {
      cnt = 0;

      answer = [
        "daughter",
        "cook",
        "aren't",
        "which",
        "niece",
        "told",
        "been",
        "is",
      ];

      let points = [5, 5, 10, 10, 10, 10, 10, 20];
      for (let i = 1; i < 9; i++) {
        if (req.body["" + i]) {
          first[i - 1] = req.body["" + i];
          if (req.body["" + i] == answer[i - 1]) {
            final[i - 1] = {
              status: true,
            };
            cnt = cnt + points[i - 1];
            ans[i] = true;
          } else {
            ans[i] = false;
            final[i - 1] = {
              status: false,
              answer: answer[i - 1],
            };
          }
        } else {
          final[i - 1] = {
            status: -1,
            answer: answer[i - 1],
          };
        }
      }

      let cnt1 = 0; //عداد الاجابات الصح
      let cntwrong1 = 0;
      let wrong1 = [];
      let trueanswer1 = [];
      let che1;
      check1 = ["shirt", "cap"];
      let length_of_check1 = 0;
      if (req.body.check1) {
        length_of_check1 = req.body.check1.length;
        for (let i = 0; req.body.check1[i]; i++) {
          if (
            (req.body.check1[i] == check1[0] ||
              req.body.check1[i] == check1[1]) &&
            length_of_check1 == 2
          ) {
            cnt += 5;
            cnt1++;
            trueanswer1[trueanswer1.length] = req.body.check1[i];
          } else {
            cntwrong1++;
            wrong1[wrong1.length] = req.body.check1[i];
          }
        }
      }
      if (length_of_check1 == 2) {
        if (cnt1 == 2) {
          checkResult[0] = {
            case: true,
          };
        } else if (cntwrong1 == 1 && cnt1 == 1) {
          if (trueanswer1[0] == check1[0]) che1 = check1[1];
          else che1 = check1[0];
          checkResult[0] = {
            case: false,
            response1: wrong1[0],
            trueanswer1: trueanswer1[0],
            truecheck1: che1,
            cntwrong: 1,
          };
        } else if (cntwrong1 == 2) {
          checkResult[0] = {
            case: false,
            response1: wrong1[0],
            response2: wrong1[1],
            truecheck1: check1[0],
            truecheck2: check1[1],
            cntwrong: 2,
          };
        }
      } else if (length_of_check1 == 0) {
        checkResult[0] = {
          case: -1,
          response1: check1[0],
          response2: check1[1],
        };
      } else {
        checkResult[0] = {
          case: -1,
          alert1: 1,
        };
      }
      let cnt2 = 0;
      let cntwrong2 = 0;
      let wrong2 = [];
      let trueanswer2 = [];
      let che;
      let length_of_check2 = 0;
      check2 = ["a pen", "a pencil"];
      if (req.body.check2) {
        length_of_check2 = req.body.check2.length;
        for (let i = 0; req.body.check2[i]; i++) {
          if (
            (req.body.check2[i] == check2[0] ||
              req.body.check2[i] == check2[1]) &&
            length_of_check2 == 2
          ) {
            cnt += 5;
            cnt2++;
            trueanswer2[trueanswer2.length] = req.body.check2[i];
          } else {
            cntwrong2++;
            wrong2[wrong2.length] = req.body.check2[i];
          }
        }
      }
      if (length_of_check2 == 2) {
        if (cnt2 == 2) {
          checkResult[1] = {
            case: true,
          };
        } else if (cntwrong2 == 1 && cnt2 == 1) {
          if (trueanswer2[0] == check2[0]) che = check2[1];
          else che = check2[0];
          checkResult[1] = {
            case: false,
            response1: wrong2[0],
            trueanswer1: trueanswer2[0],
            truecheck1: che,
            cntwrong: 1,
          };
        } else if (cntwrong2 == 2) {
          checkResult[1] = {
            case: false,
            response1: wrong2[0],
            response2: wrong2[1],
            truecheck1: check2[0],
            truecheck2: check2[1],
            cntwrong: 2,
          };
        }
      } else if (length_of_check2 == 0) {
        checkResult[1] = {
          case: -1,
          response1: check2[0],
          response2: check2[1],
        };
      } else {
        checkResult[1] = {
          case: -1,
          alert1: 1,
        };
      }

      res.send();
    });
    app.get("/link", function (req, res) {
      let first1 = first;
      if (cnt <= 25)
        result =
          "your points are " +
          cnt +
          "  I advise you to choose the beginner level";
      else if (cnt > 25 && cnt <= 50)
        result =
          "your points are " +
          cnt +
          "  I advise you to choose the Intermediate level";
      else if (cnt > 50 && cnt <= 75)
        result =
          "your points are " +
          cnt +
          "  I advise you to choose the Advanced level";
      else
        result =
          "your points are " + cnt + "  I advise you to choose the TOEFL level";

      let res1 = {
        final: final,
        checkResult: checkResult,
        result: result,
        first1: first1,
        ans: ans,
      };

      res.json(res1);
    });
  },
};
