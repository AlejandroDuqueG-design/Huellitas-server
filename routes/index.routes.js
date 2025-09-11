const express = require("express");
const path = require("path");
const router = express.Router();
const dogRouter = require("./Dog.routes")
const adoptionRouter = require("./Adoption.routes")
const userRouter = require("./User.routes")


// ℹ️ Test Route. Can be left and used for waking up the server if idle (inactivo)
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/dog", dogRouter);
router.use("/adoption", adoptionRouter);
router.use("/user", userRouter)

const authRouter = require ("./auth.routes")
router.use ("/auth", authRouter)


module.exports = router;
