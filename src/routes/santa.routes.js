const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const santaController = require("../controllers/santa.controller");

router.post(
  "/",
  upload.fields([
    { name: "employees", maxCount: 1 },
    { name: "previous", maxCount: 1 },
  ]),
  santaController.generate
);

module.exports = router;
