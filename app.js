const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const port = 3000;

var items = [];
var workItems = [];

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let day = date.getDate();
  res.render("index", { listTitle: day, newListItem: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;

  console.log(req.body.list);

  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    res.redirect("/");
    items.push(item);
  }
});

app.get("/work", function (req, res) {
  res.render("index", { listTitle: "Work List", newListItem: workItems });
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;

  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
