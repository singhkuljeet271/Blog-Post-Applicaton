var userdb = require("../schema/schema2");

module.exports = {
  findpost: function(data) {
    // console.log("ye fetch ki call h");
    return new Promise((resolve, reject) => {
      if (data.body == "") {
        userdb.find({}, function(err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } else {
        userdb.find({ username: data.body }, function(err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      }
    });
  },
  findpost2: function() {
    // console.log("ye fetch ki call h");
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
  updatenewcomment: function(data) {
    return new Promise((resolve, reject) => {
      userdb.findOneAndUpdate(
        { _id: data.singlepost._id },
        { $push: { comment: data.comment } },
        { new: true },
        function(err, res) {
          if (err) reject(err);
          else {
            console.log("new data", res);
            resolve(res);
          }
        }
      );
    });
  },
  updatenewclick: function(data) {
    return new Promise((resolve, reject) => {
      userdb.findOneAndUpdate(
        { _id: data._id },
        { $inc: { clicks: 1 } },
        { new: true },
        function(err, res) {
          if (err) reject(err);
          else {
            console.log(res);
            resolve(res);
          }
        }
      );
    });
  },
  verifylike: function(data) {
    return new Promise((resolve, reject) => {
      console.log("this is verifylike", data);
      userdb.find({ $and: [{ _id: data.id }, { like: data.like }] }, function(
        err,
        res
      ) {
        if (err) {
          console.log("error in verify like", err);
          reject(err);
        } else {
          console.log("gdjkgqwdq", res);
          resolve(res);
        }
      });
    });
  },
  incrementlike: function(data) {
    return new Promise((resolve, reject) => {
      userdb.findOneAndUpdate(
        { _id: data.id },
        { $push: { like: data.like } },
        { new: true },
        function(err, res) {
          if (err) reject(err);
          else {
            console.log(res);
            resolve(res);
          }
        }
      );
    });
  },
  decrementlike: function(data) {
    return new Promise((resolve, reject) => {
      userdb.findOneAndUpdate(
        { _id: data.id },
        { $pull: { like: data.like } },
        { new: true },
        function(err, res) {
          if (err) reject(err);
          else {
            console.log(res);
            resolve(res);
          }
        }
      );
    });
  },
  getcomment: function(data) {
    return new Promise((resolve, reject) => {
      console.log("ye call ayi 2");
      userdb.find({ _id: data.singlepost._id }, function(err, res) {
        if (err) reject(err);
        else {
          console.log(res);
          resolve(res);
        }
      });
    });
  },
  uploadnewpost: function(data, imagedata) {
    return new Promise((resolve, reject) => {
      data.date = new Date().toString().slice(4, 15);
      data.time = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      });
      console.log(data.date);
      data.iso = new Date();
      data.clicks = 0;
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
