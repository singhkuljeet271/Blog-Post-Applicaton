let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ppldata");
let addcategory = mongoose.Schema({
  category: String,
  imagename: String
});
module.exports = mongoose.model("category", addcategory);
