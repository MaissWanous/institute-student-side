const { time, count } = require("console");
const { response } = require("express");
const { write, link } = require("fs");
var moment = require("moment");
const English = require("./English");
let selected_level1, selected_subject1;
var confirm = "";
var code;
var confCod;
var email;
var tel;
var name;
var error;
var selected_subject;
var obj1;
var obj2;
var selected_level;
var selected_book;
var snaps = false;
module.exports = {
  register: function (l, s) {
    selected_level1 = l;
    selected_subject1 = s;
    selected_subject = s;
  },
  signUp: function (app, dic) {
    let xol = "";
    app.get("/signUp", function (req, res) {
      console.log(selected_subject1 + "get");
      selected_subject = selected_subject1;

      xol = selected_subject1;
      res.sendFile(dic + "/HTML/signUp.html");
    });
    const axios = require("axios");
    var price;
    var created = moment().format("YYYY-MM-DD");
    var test1;
    let timeR;
    var book;
    var flag, Cemail, Cregiste, Cinput;
    var ID;
    var count;
    var BookId;
    var MongoClient = require("mongodb").MongoClient;
    var url = "mongodb://0.0.0.0:27017/languages";

    let accept_email = ["hotmail", "gmail"];
    app.post("/signUp", async function (req, res) {
      snaps = false;
      MongoClient.connect(url, async function (err, db) {
        selected_subject = xol;
        selected_subject1 = xol;
        obj1 = "";
        var dbo = db.db("languages");

        test1 = "";
        (flag = false), (Cemail = false), (Cregiste = true);
        selected_subject = selected_subject1;
        if (selected_subject == "English") {
          selected_level = selected_level1;
        }

        book = "";

        if (selected_subject == "English") {
          if (req.body.book) {
            book = "You want the book and its price 8000";
            flag = true;
          }
        } else {
          if (req.body.book) {
            book = "You want the book and its price 12000";
            flag = true;
          }
        }
        error = "";

        email = req.body.email;

        tel = req.body.tel;
        name = req.body.name;

        var newObj;

        if (selected_subject1 == "English") {
          obj1 = {
            name: name,
            email: email,
            tel: tel,
            selected_level: selected_level,
            selected_subject: selected_subject1,
            created: created,
            flag: flag,
          };
        } else {
          selected_level = "";
          obj1 = {
            name: name,
            email: email,
            tel: tel,
            selected_level: selected_level,
            selected_subject: selected_subject1,
            created: created,
            flag: flag,
          };
        }

        if (obj1.selected_level != "") {
          if (tel == "") {
            newObj = {
              selected_level: obj1.selected_level,

              email: obj1.email,

              selected_subject: obj1.selected_subject,
            };
          } else {
            newObj = {
              selected_level: obj1.selected_level,

              email: obj1.email,
              tel: obj1.tel,
              selected_subject: obj1.selected_subject,
            };
          }
        } else {
          if (tel == "") {
            newObj = {
              email: obj1.email,

              selected_subject: obj1.selected_subject,
            };
          } else {
            newObj = {
              email: obj1.email,
              tel: obj1.tel,
              selected_subject: obj1.selected_subject,
            };
          }
        }
        let emaill = email.toLowerCase();
        if (email != "") {
          for (let i = 0; i < accept_email.length; i++)
            if (emaill.search("@" + accept_email[i] + ".com") != -1) {
              Cemail = true;
              break;
            }
        }
        if (Cemail == false && email != "") {
          test1 = "not accept email";
        }

        var test;
        try {
          test = await dbo.collection("students").find(newObj).toArray();
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        if (test[0] != null) {
          error = "You are already registered";
          timeR = test[0].created;
          Cregiste = false;
        }
        try {
          if (Cemail == true && Cregiste == true && test1 == "") {
            await dbo
              .collection("counters")
              .updateOne({ I: 1 }, { $inc: { count: 0 } });
          }
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {

          code = Math.floor(Math.random() * 1000000);
          console.log(code);
          if (Cemail == true && Cregiste == true && test1 == "") {
            const nodemailer = require("nodemailer"); // Require the Nodemailer package
            async function main() {
              // SMTP config
              const transporter = nodemailer.createTransport({
                host: "smtp.elasticemail.com", //
                port: 2525,
                auth: {
                  user: "hananalrstom87@gmail.com", // Your Ethereal Email address
                  pass: "1980E59A59ABF2E83538525EF3B1FD9C1824", // Your Ethereal Email password
                },
              }); // Send the email
              let info = await transporter.sendMail({
                from: "hananalrstom87@gmail.com",
                to: email, // Test email address
                subject: "Verify your new account ",
                text: "To verify your email address, please use the following One Time Password (OTP) :",
                html: "To verify your email address, please use the following One Time Password <strong>" + code + "</strong> :",
              });
              console.log("Message sent: %s", info.messageId); // Output message ID
              console.log("View email: %s", nodemailer.getTestMessageUrl(info)); // URL to preview email
            }
            // Catch any errors and output them to the console
            main().catch(console.error);
          }
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        res.send();
      });
    });
    var wrong = "";
    app.post("/registe", async (req, res) => {
      confCod = parseInt(req.body.code);
      console.log("code" + confCod);
      if (confCod == code) {
        MongoClient.connect(url, async function (err, db) {
          if (err) throw err;
          var dbo = db.db("languages");
          try {
            count = await dbo.collection("counters").find({ I: 1 }).toArray();
            ID = await count[0].count;
            obj1.student_id = ID;
          } catch (err) {
            if (err) {
              snaps = true;
            }
          }
          let oldRegist = [];
          if (flag == true) {
            let n, m, l;
            let updatebooks = [];
            let updateprice = 0;
            let updatetotalPrice = 0;

            if (xol == "English") {
              selected_book = selected_level1;
              price = 8000;
            } else {
              selected_book = xol;
              price = 12000;
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
                updatebooks = s.concat(selected_book);
                updateprice = p.concat(price);
                price += oldRegist[0].totalPrice;
                updatetotalPrice = price;
                try {
                  if (n == true) {
                    await dbo.collection("Book").updateOne(
                      { name: name, email: email },
                      {
                        $set: {
                          books: updatebooks,
                          price: updateprice,
                          totalPrice: updatetotalPrice,
                        },
                      }
                    );
                  } else if (l == true) {
                    await dbo.collection("Book").updateOne(
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
              } else {
                obj2 = {
                  name: name,
                  tel: tel,
                  email: email,
                  books: [selected_book],
                  price: [price],
                  totalPrice: price,
                  book_id: BookId,
                };
                try {
                  await dbo
                    .collection("Book")
                    .insertOne(obj2, function (err, res) {
                      if (err) throw err;
                      console.log("add new book in signUp ");
                    });
                } catch (err) {
                  if (err) {
                    snaps = true;
                  }
                }
              }
            } catch (err) {
              if (err) {
                snaps = true;
              }
            }
            try {
              count = await dbo.collection("counters").find({ I: 2 }).toArray();
              BookId = await count[0].count;
              obj1.book_id = BookId;
            } catch (err) {
              if (err) {
                snaps = true;
                console.log(err);
              }
            }
          }
          try {
            await dbo.collection("students").insertOne(obj1, function (err, res) {
              if (err) throw err;
              console.log("add new student ");
            });
          } catch (err) {
            if (err) {
              snaps = true;
            }
          }
        });

        res.sendFile(dic + "/HTML/registe.html");
      }
      else {
        wrong = "W"
        res.send();
      }
    });

    let resSign;
    app.get("/confirm", (req, res) => {
      let oldRegist = [];
      MongoClient.connect(url, async function (err, db) {
        var dbo = db.db("languages");
        try {
          await dbo
            .collection("counters")
            .updateOne({ I: 1 }, { $inc: { count: 1 } });
          count = await dbo.collection("counters").find({ I: 1 }).toArray();
          ID = await count[0].count;
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        if (flag == true) {
          if (email != "" && tel == "") {
            try {
              oldRegist = await dbo
                .collection("Book")
                .find({ email: email, name: name })
                .toArray();
              n = true;
            } catch (err) {
              if (err) {
                snaps = true;
              }
            }
          }

          if (email != "" && tel != "") {
            try {
              oldRegist = await dbo
                .collection("Book")
                .find({ tel: tel, email: email, name: name })
                .toArray();
              l = true;
            } catch (err) {
              if (err) {
                snaps = true;
              }
            }
          }
          if (oldRegist != "") {
            BookId = oldRegist[0].book_id;
          } else {
            try {
              count = await dbo
                .collection("counters")
                .updateOne({ I: 2 }, { $inc: { count: 1 } });
              count = await dbo.collection("counters").find({ I: 2 }).toArray();
              BookId = await count[0].count;
              console.log(BookId);
            } catch (err) {
              if (err) {
                snaps = true;
                console.log(err);
              }
            }
          }
        }
        let timen = created;
        resSign = {
          name: name,
          email: email,
          tel: tel,

          timen: timen,
          error: error,
          test1: test1,
          timeR: timeR,
          book: book,
          ID: ID,
          BookId: BookId,
          obj1: obj1,
          snaps: snaps,
          Wrong: wrong
        };
        res.json(resSign);
      });
    });
  },
};
