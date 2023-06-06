module.exports = {
  book: function (app, dic) {
    app.get("/book", function (req, res) {
      res.sendFile(dic + "/HTML/book.html");
    });
    var MongoClient = require("mongodb").MongoClient;
    var url = "mongodb://0.0.0.0:27017/languages";
    var cnt;
    var confirm = "";
    var student_book = [];
    var oldRegist = [];
    var price = [];
    var error;
    var tel;
    var email;
    var name;
    var test1;
    var obj;
    var Cemail;
    var updatebooks;
    var updateprice;
    var updatetotalPrice;
    var n, m, l;
    var emaill;
    var ID;
    var snaps = false;
    let accept_email = ["hotmail", "gmail"];
    app.post("/Sbook", async (req, res) => {
      snaps = false;
      obj = {
        name: "",
        tel: "",
        email: "",
        books: [],
        price: [],
        totalPrice: "",
        book_id: "",
      };

      error = "";
      confirm = "";
      student_book = [];
      oldRegist = [
        {
          name: "",
          tel: "",
          email: "",
          books: [],
          price: [],
          totalPrice: "",
        },
      ];
      cnt = 0;
      updateprice = [];
      updatebooks = [];
      updatetotalPrice = 0;
      Cemail = false;
      price = [];
      test1 = "";
      if (req.body.email == "" && req.body.tel == "")
        confirm = "You must at least enter your number or email";

      if (req.body.book) {
        for (let i = 0; req.body.book[i]; i++) {
          if (
            req.body.book[i] == "German" ||
            req.body.book[i] == "Russian" ||
            req.body.book[i] == "Frensh" ||
            req.body.book[i] == "kids"
          ) {
            cnt += 12000;
            obj.price[i] = 12000;
            price[i] = 12000;
          } else {
            cnt += 8000;
            obj.price[i] = 8000;
            price[i] = 8000;
          }
          student_book[i] = req.body.book[i];
        }
        obj.books = student_book;
        obj.totalPrice = cnt;
        obj.name = req.body.name;
        obj.email = req.body.email;
        obj.tel = req.body.tel;
      }
      tel = req.body.tel;
      emaill = req.body.email;
      name = req.body.name;
      email = emaill.toLowerCase();
      oldRegist = [
        {
          name: "",
          tel: "",
          email: "",
          books: [],
          price: [],
          totalPrice: "",
        },
      ];

      if (email != "") {
        for (let i = 0; i < accept_email.length; i++)
          if (email.search("@" + accept_email[i] + ".com") != -1) {
            Cemail = true;
            console.log(Cemail);
            break;
          }
      }
      if (Cemail == false && email != "") {
        test1 = "Not accept email";
      }
      res.send();
    });

    app.post("/confirmB", (req, res) => {
      n = false;
      m = false;
      l = false;
      MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db("languages");
        try {
          count = await dbo.collection("counters").find({ I: 2 }).toArray();
          ID = await count[0].count;
          obj.book_id = ID;
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          if (email != "" && tel == "") {
            oldRegist = await dbo
              .collection("Book")
              .find({ email: email, name: name })
              .toArray();
            n = true;
          }
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          if (email == "" && tel != "") {
            oldRegist = await dbo
              .collection("Book")
              .find({ tel: tel, name: name })
              .toArray();
            m = true;
          }
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          if (email != "" && tel != "") {
            oldRegist = await dbo
              .collection("Book")
              .find({ tel: tel, email: email, name: name })
              .toArray();
            l = true;
          }
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          if (oldRegist != "") {
            var s = oldRegist[0].books;
            var p = oldRegist[0].price;
            updatebooks = s.concat(student_book);
            updateprice = p.concat(price);
            cnt += oldRegist[0].totalPrice;
            console.log(n + " " + m + " " + l);
            try {
              if (n == true) {
                dbo.collection("Book").updateOne(
                  { name: name, email: email },
                  {
                    $set: {
                      books: updatebooks,
                      price: updateprice,
                      totalPrice: updatetotalPrice,
                    },
                  }
                );
              } else if (m == true) {
                dbo.collection("Book").updateOne(
                  { name: name, tel: tel },
                  {
                    $set: {
                      books: updatebooks,
                      price: updateprice,
                      totalPrice: updatetotalPrice,
                    },
                  }
                );
              } else if (l == true) {
                dbo.collection("Book").updateOne(
                  { name: name, tel: tel, email: email },
                  {
                    $set: {
                      books: updatebooks,
                      price: updateprice,
                      totalPrice: updatetotalPrice,
                    },
                  }
                );
              }
            } catch (err) {
              if (err) {
                snaps = true;
              }
            }
            console.log(oldRegist);
          } else if (obj.name != "") {
            dbo.collection("Book").insertOne(obj, function (err, res) {
              if (err) throw err;
              console.log("add books ");
              db.close();
            });
          }
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
      });

      res.sendFile(dic + "/HTML/registe.html");
    });
    app.get("/Bbook", (req, res) => {
      MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db("languages");
        try {
          if (email != "" && tel == "")
            oldRegist = await dbo
              .collection("Book")
              .find({ email: email, name: name })
              .toArray();
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          if (email == "" && tel != "") {
            oldRegist = await dbo
              .collection("Book")
              .find({ tel: tel, name: name })
              .toArray();
          }
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          if (email != "" && tel != "") {
            oldRegist = await dbo
              .collection("Book")
              .find({ tel: tel, email: email, name: name })
              .toArray();
          }
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          if (oldRegist != "") {
            cnt += oldRegist[0].totalPrice;
            updatetotalPrice = cnt;
            console.log(oldRegist);
            ID = oldRegist[0].book_id;
          } else if (student_book == "") {
            confirm = "You didn't select any book !"
          } else {
            dbo
              .collection("counters")
              .updateOne({ I: 2 }, { $inc: { count: 1 } });
            count = await dbo.collection("counters").find({ I: 2 }).toArray();
            ID = await count[0].count;
            console.log(ID);
          }
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        Bbook = {
          student_book: student_book,
          cnt: cnt,
          confirm: confirm,
          oldRegist: oldRegist,
          test1: test1,
          updatetotalPrice: updatetotalPrice,
          ID: ID,
          snaps: snaps,
        };
        res.json(Bbook);
      });
    });
  },
};
