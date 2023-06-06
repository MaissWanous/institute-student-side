const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const_ = require("lodash");
const bodyparser = require("body-parser");
const { result } = require("lodash");
const app = express();

const English1 = require("./JS/English.js");
const test = require("./JS/test.js");
const signUp = require("./JS/signUp.js");
const kids = require("./JS/kids.js");
const book = require("./JS/book.js");
const edit = require("./JS/edit.js");
const delete1 = require("./JS/delete.js");
const forget = require("./JS/forget.js");
const database = require("./database.js");
const check = require("./JS/check.js");
const check2 = require("./JS/check2.js");
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(express.static("public"));
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));
English1.English(app, __dirname);
test.test(app, __dirname);
book.book(app, __dirname);
signUp.signUp(app, __dirname);
kids.kids(app, __dirname);
edit.edit(app, __dirname);
forget.forget(app, __dirname);
delete1.delete(app, __dirname);
database.database(app, __dirname);
check.check(app, __dirname);
check2.check2(app, __dirname);
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/subjects.html");
});
app.get("/about", function (req, res) {
  res.sendFile(__dirname + "/HTML/team.html");
});

var selected_subject = "";
app.post("/student", function (req, res) {
  selected_subject = "";
  if (req.body.subject) selected_subject = req.body.subject;

  res.send();
});
app.get("/link1", function (req, res) {
  var res2 = {
    selected_subject: selected_subject,
  };
  signUp.register("", selected_subject);
  res.json(res2);
});

app.get("/signUp", function (req, res) {
  res.sendFile(__dirname + "/HTML/signUp.html");
});
app.get("/help", function (req, res) {
  res.sendFile(__dirname + "/HTML/help.html");
});

app.get("/email", function (req, res) {
  const nodemailer = require("nodemailer"); // Require the Nodemailer package
  async function main() {
    // SMTP config
    const transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com", //
      port: 2525,
      auth: {
        user: "maisswanous@gmail.com", // Your Ethereal Email address
        pass: "40C311152A19C53414136040013F59AD115E", // Your Ethereal Email password
      },
    }); // Send the email
    let info = await transporter.sendMail({
      from: 'maisswanous@gmail.com',
      to: "m3653387@gmail.com", // Test email address
      subject: "subject",
      text: "Here's a jext version of the email.",
      html: "Here's an <strong>HTML version</strong> of the email.",
    });
    console.log("Message sent: %s", info.messageId); // Output message ID
    console.log("View email: %s", nodemailer.getTestMessageUrl(info)); // URL to preview email
  }
  // Catch any errors and output them to the console
  main().catch(console.error);

});

app.listen(8080, function (req, res) {
  console.log("server started on port 8080");
});
