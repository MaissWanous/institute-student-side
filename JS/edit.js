const { result, isNull } = require("lodash");

module.exports = {
  edit: function (app, dic) {
    app.get("/edit", function (req, res) {
      res.sendFile(dic + "/HTML/edit.html");
    });
    let result = "";
    var id;
    var old_information = {};
    var flagN = false;
    var subject;
    var studentEdit;
    var idN;
    var new_information = {
      name: "",
      tel: "",
      email: "",
      flag: "",
      selected_level: "",
      selected_subject: "",
    };
    var book;
    var snaps = false;
    var MongoClient = require("mongodb").MongoClient;
    var url = "mongodb://0.0.0.0:27017/languages";

    app.post("/editInfo", async function (req, res) {
      snaps = false;
      result = "";
      old_information = {};
      new_information = {
        name: "",
        tel: "",
        email: "",
        flag: "",
        selected_level: "",
        selected_subject: "",
      };

      MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db("languages");
        try {
          studentEdit = await dbo
            .collection("students")
            .find({ student_id: idN })
            .toArray();
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
      });
      id = req.body.id;

      idN = parseInt(id);
      subject = req.body.subject;
      new_information.name = req.body.name;
      new_information.tel = req.body.tel;
      new_information.email = req.body.email;

      if (
        subject == "Kids" ||
        subject == "German" ||
        subject == "Frensh" ||
        subject == "Russian"
      ) {
        new_information.selected_subject = subject;
        new_information.selected_level = "";
      } else if (subject == "") {
        new_information.selected_subject = "";
        new_information.selected_level = "";
      } else {
        new_information.selected_subject = "English";
        new_information.selected_level = subject;
      }

      res.send();
    });
    app.post("/editC", (req, res) => {
      MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db("languages");
        try {
          if (new_information.name != "")
            dbo
              .collection("students")
              .findOneAndUpdate(
                { student_id: idN },
                { $set: { name: new_information.name } }
              );
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          studentEdit = await dbo
            .collection("students")
            .find({ student_id: idN })
            .toArray();
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          if (new_information.tel != "")
            dbo
              .collection("students")
              .findOneAndUpdate(
                { student_id: idN },
                { $set: { tel: new_information.tel } }
              );
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          if (new_information.email != "")
            dbo
              .collection("students")
              .findOneAndUpdate(
                { student_id: idN },
                { $set: { email: new_information.email } }
              );
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }

        try {
          if (new_information.name != "")
            dbo
              .collection("Book")
              .findOneAndUpdate(
                { book_id: studentEdit[0].book_id },
                { $set: { name: new_information.name } }
              );
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          if (new_information.tel != "")
            dbo
              .collection("Book")
              .findOneAndUpdate(
                { book_id: studentEdit[0].book_id },
                { $set: { tel: new_information.tel } }
              );
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          if (new_information.email != "")
            dbo
              .collection("Book")
              .findOneAndUpdate(
                { book_id: studentEdit[0].book_id },
                { $set: { email: new_information.email } }
              );
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          if (
            new_information.selected_subject != "" ||
            new_information.selected_level != ""
          )
            dbo.collection("students").findOneAndUpdate(
              { student_id: idN },
              {
                $set: {
                  selected_subject: new_information.selected_subject,
                  selected_level: new_information.selected_level,
                },
              }
            );
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        try {
          if (studentEdit[0].flag == true) {
            let PriceBook;

            let listBook = await dbo
              .collection("Book")
              .find({ book_id: studentEdit[0].book_id })
              .toArray();

            let newBooks = listBook[0].books;
            let newPrice = listBook[0].price;
            let totalPrice = 0;
            if (
              new_information.selected_subject != "" ||
              new_information.selected_level != ""
            ) {
              flagN = true;
              if (new_information.selected_subject == "English") {
                PriceBook = 8000;
              } else {
                PriceBook = 12000;
              }
              for (let i = 0; i < listBook[0].books.length; i++) {
                if (
                  listBook[0].books[i] == studentEdit[0].selected_subject ||
                  listBook[0].books[i] == studentEdit[0].selected_level
                ) {
                  if (new_information.selected_subject != "English") {
                    newBooks[i] = new_information.selected_subject;
                    newPrice[i] = PriceBook;
                    break;
                  } else {
                    newBooks[i] = new_information.selected_level;
                    newPrice[i] = PriceBook;
                    break;
                  }
                }
              }
            }
            for (let i = 0; i < newPrice.length; i++) {
              totalPrice += newPrice[i];
            }

            dbo.collection("Book").findOneAndUpdate(
              { book_id: studentEdit[0].book_id },
              {
                $set: {
                  books: newBooks,
                  price: newPrice,
                  totalPrice: totalPrice,
                },
              }
            );
          }
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
      });

      res.sendFile(dic + "/HTML/registe.html");
    });
    app.get("/editN", (req, res) => {
      MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db("languages");
        try {
          studentEdit = await dbo
            .collection("students")
            .find({ student_id: idN })
            .toArray();
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        if (studentEdit == "") {
          result = "Sorry , but this number does not exist";
        } else {
          if (studentEdit[0].flag == true) {
            if (new_information.selected_subject == "English") {
              book =
                "you are registered on the " +
                new_information.selected_level +
                " book";
            } else if (new_information.selected_subject != "") {
              book =
                "you are registered on the " +
                new_information.selected_subject +
                " book";
            } else if (studentEdit[0].selected_subject == "English") {
              book =
                "you are registered on the " +
                new_information.selected_level +
                " book";
            } else {
              book =
                "you are registered on the " +
                new_information.selected_subject +
                " book";
            }
          } else book = "you aren't registered on the book";
          old_information = {
            name: studentEdit[0].name,
            tel: studentEdit[0].tel,
            email: studentEdit[0].email,
            flag: book,
            selected_level: studentEdit[0].selected_level,
            selected_subject: studentEdit[0].selected_subject,
          };
        }

        Ndata = {
          old_information: old_information,
          new_information: new_information,
          result: result,
          flagN: flagN,
          snaps: snaps,
        };
        res.json(Ndata);
      });
    });
  },
};
