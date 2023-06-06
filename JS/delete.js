const { result, remove, isNull } = require("lodash");
const fs = require("fs");
module.exports = {
  delete: function (app, dic) {
    app.get("/delete1", function (req, res) {
      res.sendFile(dic + "/HTML/delete1.html");
    });

    var studentDelete;
    var id;
    let student = [];
    let newStudent = [];
    let index;
    var old_information = {};
    var data1;
    var idN;
    var book;
    var result = "";
    var snaps = false;
    app.post("/delete1", async function (req, res) {
      studentDelete = [];
      old_information = {};
      result = "";
      id = req.body.id;
      idN = parseInt(id);

      res.send();
    });
    app.post("/confirmD", async (req, res) => {
      snaps = false;
      var MongoClient = require("mongodb").MongoClient;
      var url = "mongodb://0.0.0.0:27017/languages";
      MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db("languages");
        try {
          studentDelete = await dbo
            .collection("students")
            .find({ student_id: idN })
            .toArray();
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        let data = JSON.stringify(studentDelete);
        fs.writeFileSync("student-2.json", data);
        if (studentDelete[0].flag == true) {
          try {
            let listBook = await dbo
              .collection("Book")
              .find({ book_id: studentDelete[0].book_id })
              .toArray();
            let newBooks = listBook[0].books;
            let newPrice = listBook[0].price;
            let dBooks = [];
            let totalPrice = 0;
            let dPrice = [];
            let d;
            for (let i = 0; i < listBook[0].books.length; i++) {
              if (
                listBook[0].books[i] == studentDelete[0].selected_subject ||
                listBook[0].books[i] == studentDelete[0].selected_level
              )
                d = i;
            }

            for (let m = 0; m < listBook[0].books[d - 1]; m++) {
              dBooks[m] = newBooks[m];
              dPrice[m] = newPrice[m];
            }

            for (d + 1; d + 1 < listBook[0].books.length - 1; d++) {
              dBooks[d] = newBooks[d + 1];
              dPrice[d] = newPrice[d + 1];
            }
            for (let i = 0; i < dPrice.length; i++) {
              totalPrice += dPrice[i];
            }

            await dbo.collection("Book").findOneAndUpdate(
              { book_id: studentDelete[0].book_id },
              {
                $set: {
                  books: dBooks,
                  price: dPrice,
                  totalPrice: totalPrice,
                },
              }
            );

            if (dBooks == "") {
              await dbo
                .collection("Book")
                .deleteOne(
                  { book_id: studentDelete[0].book_id },
                  function (err, obj) {
                    if (err) throw err;
                    console.log(" book  deleted");
                  }
                );
            }
          } catch (err) {
            if (err) {
              snaps = true;
            }
          }
        }
        try {
          dbo
            .collection("students")
            .deleteOne({ student_id: idN }, function (err, obj) {
              if (err) throw err;
              console.log(" document(s) deleted");
              db.close();
            });
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
      });
      res.sendFile(dic + "/HTML/registe.html");
    });
    app.get("/remove", (req, res) => {
      var MongoClient = require("mongodb").MongoClient;
      var url = "mongodb://0.0.0.0:27017/languages";
      MongoClient.connect(url, async function (err, db) {
        studentDelete = [];
        if (err) throw err;

        var dbo = db.db("languages");
        try {
          studentDelete = await dbo
            .collection("students")
            .find({ student_id: idN })
            .toArray();
        } catch (err) {
          if (err) {
            snaps = true;
          }
        }
        if (studentDelete == "") {
          result = "Sorry , but this number does not exist";
        } else {
          if (studentDelete[0].flag == true)
            book = "you are registered on the book";
          else book = "you aren't registered on the book";
          old_information = {
            name: studentDelete[0].name,
            tel: studentDelete[0].tel,
            email: studentDelete[0].email,
            flag: book,
            selected_level: studentDelete[0].selected_level,
            selected_subject: studentDelete[0].selected_subject,
          };
        }

        console.log(old_information);
        var removeD = {
          newStudent: newStudent,
          index: index,
          old_information: old_information,
          studentDelete: studentDelete,
          result: result,
          snaps: snaps,
        };
        res.json(removeD);
      });
    });
  },
};
