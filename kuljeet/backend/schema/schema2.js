let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ppldata");
let Uploadpost = mongoose.Schema({
  imagename: String,
  description: String,
  category: String,
  username: String,
  date: String,
  time: String,
  comment: Array,
  clicks: Number,
  iso: Date,
  like: Array
});
module.exports = mongoose.model("upload", Uploadpost);
