const express = require("express");
const path = require("path");
const router = express.Router();
const cohortsRouter = require("./cohorts.routes");
const studentsRouter = require("./students.routes");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
