var userdb = require("../schema/schema3");

module.exports = {
  findcategory: function(data) {
    return new Promise((resolve, reject) => {
      userdb.find({}, function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },

  addcategory: function(data, imagedata) {
    return new Promise((resolve, reject) => {
      data.imagename = imagedata.filename;
      userdb.create(data, function(err, res) {
        if (err) reject(err);
        else {
          resolve(res);
        }
      });
    });
  }
};
