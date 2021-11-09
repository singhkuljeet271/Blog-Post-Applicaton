var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ppldata");
var Registration = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstname: String,
  lastname: String,
  verify: Boolean
});
module.exports = mongoose.model("user", Registration);
