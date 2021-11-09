var express = require("express");
var router = express.Router();
var userapi = require("../api/api");
let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vasumehta311@gmail.com",
    pass: "vasu2408"
  }
});

router.post("/register", async function(req, res) {
  try {
    let result1 = await userapi.verifyregisteruser(req.body);
    if (result1 == "") {
      console.log("create");
      let result = await userapi.createnewuser(req.body);
      const mailOptions = {
        from: "vasumehta311@gmail.com",
        to: req.body.email,
        subject: "Please confirm your Email account",
        html:
          "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
          "http://localhost:1414/abc/" +
          result.id +
          ">Click here to verify</a>"
      };

      transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log(err);
        else console.log(info);
      });

      console.log("user created ", result);
      res.send(result);
    } else {
      //already user exist
      res.send("1");
      console.log("already user exist");
    }
  } catch (err) {
    res.send(err);
  }
});

router.post("/login", async function(req, res) {
  try {
    console.log("login router");
    let detail = req.body;
    let pswd = detail.password;

    let result = await userapi.verifyregisteruser(req.body);
    console.log(result);

    if (result.length == 0) {
      //please register
      console.log("please register");
      res.send({ result: 1 });
    } else {
      if (result[0].password == pswd) {
        if (result[0].verify == true) {
          res.send(result[0]);
        } else res.send({ result: 3 });
      } else {
        //password incorrect
        console.log("password incorrect");
        res.send({ result: 2 });
      }
    }
  } catch (err) {
    res.send(err);
  }
});

router.post("/forget", async function(req, res) {
  try {
    let result1 = await userapi.verifyregisteruser(req.body);
    console.log("after verification", result1);
    if (result1.length != 0) {
      const mailOptions = {
        from: "vasumehta311@gmail.com",
        to: req.body.email,
        subject: "Please Reset your password",
        html:
          "Hello,<br> Please Click on the link to reset your password.<br><a href=" +
          "http://localhost:1414/abc/reset/" +
          result1[0]._id +
          ">Click here to reset</a>"
      };

      transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log(err);
        else console.log(info);
      });
      res.send("2");
    } else {
      //already user exist
      res.send("1");
      console.log("Email not registered");
    }
  } catch (err) {
    res.send(err);
  }
});
router.get("/:id", async function(req, res) {
  try {
    console.log("request param", req.params.id);
    let result = await userapi.verifyemail(req.params.id);
    console.log("hello");
    res.redirect("http://localhost:3000/Login");
  } catch (err) {
    res.send(err);
  }
});
router.post("/reset2", async function(req, res) {
  try {
    //  let result = await userapi.resetpassword(req.params.id);
    let result = await userapi.resetpassword(req.body);
    console.log("sb thik hua");
    res.send("1");
  } catch (err) {
    res.send(err);
  }
});
router.get("/reset/:id", async function(req, res) {
  try {
    console.log("reset password body ------", req.body);
    //  let result = await userapi.resetpassword(req.params.id);

    res.redirect("http://localhost:3000/Reset/" + req.params.id);
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
