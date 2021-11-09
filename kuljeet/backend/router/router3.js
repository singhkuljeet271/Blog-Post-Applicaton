var express = require("express");
var router = express.Router();
var userapi = require("../api/api3");

let multer = require("multer");

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
let upload = multer({ storage: storage });

router.post("/addcategory", upload.single("file"), async function(req, res) {
  try {
    let result = await userapi.addcategory(req.body, req.file);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
});
router.get("/getcategory", async function(req, res) {
  try {
    let result = await userapi.findcategory(req.body);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
