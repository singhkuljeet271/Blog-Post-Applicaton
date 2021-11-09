var userdb = require("../schema/schema");

module.exports = {
  verifyregisteruser: function(data) {
    return new Promise((resolve, reject) => {
      userdb.find({ email: data.email }, function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
  verifyemail: function(data) {
    return new Promise((resolve, reject) => {
      userdb.update({ _id: data }, { $set: { verify: true } }, function(
        err,
        res
      ) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
  resetpassword: function(data) {
    return new Promise((resolve, reject) => {
      console.log(data);
      userdb.update(
        { _id: data.id },
        { $set: { password: data.password1 } },
        function(err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },
  createnewuser: function(data) {
    return new Promise((resolve, reject) => {
      data.verify = false;
      userdb.create(data, function(err, res) {
        if (err) reject(err);
        else {
          resolve(res);
        }
      });
    });
  }
};
