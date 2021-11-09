var express = require("express");
var router = require("./router/router");
var router2 = require("./router/router2");
var router3 = require("./router/router3");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ppldata");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/abc", router);
app.use("/def", router2);
app.use("/ghi", router3);
app.use(express.static(__dirname + "/public"));
app.listen(1414, () => {
  console.log("server is running");
});
