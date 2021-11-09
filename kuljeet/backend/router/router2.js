var express = require("express");
var router = express.Router();
var userapi = require("../api/api2");

let multer = require("multer");
let result1;
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
let upload = multer({ storage: storage });
router.post("/uploadpost", upload.single("file"), async function(req, res) {
  try {
    let result = await userapi.uploadnewpost(req.body, req.file);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
});
router.post("/updatecomment", async (req, res) => {
  try {
    console.log("router2--- ", req.body);
    let result = await userapi.updatenewcomment(req.body);
    console.log("result form api", result);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});
router.post("/updateclick", async function(req, res) {
  try {
    let result = await userapi.updatenewclick(req.body);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
});
router.post("/updatelike", async function(req, res) {
  try {
    console.log("this is update like");
    let result = await userapi.verifylike(req.body);
    console.log("this is", result);
    if (result.length == 0) {
      result1 = await userapi.incrementlike(req.body);
    } else {
      result1 = await userapi.decrementlike(req.body);
    }
    let result3 = await userapi.findpost2();
    let resultdata = [result1, result3];
    res.send(resultdata);
  } catch (err) {
    res.send(err);
  }
});

router.post("/allcomment", async function(req, res) {
  try {
    console.log("ye call ayi");
    let result = await userapi.getcomment(req.body);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
});
router.post("/reg", async function(req, res) {
  try {
    console.log("ye upload post ki call h", req.body);
    let result = await userapi.findpost(req.body);
    console.log("ye upload post ki call h 2", result);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
