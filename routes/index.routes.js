const express = require("express");
const path = require("path");
const router = express.Router();
const dogRouter = require("./dog.routes")
const adoptionRouter = require("./adoption.routes")
const userRouter = require("./user.routes")


// ℹ️ Test Route. Can be left and used for waking up the server if idle (inactivo)
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/dog", dogRouter);
router.use("/adoption", adoptionRouter);
router.use("/user", userRouter)

const authRouter = require ("./auth.routes")
router.use ("/auth", authRouter)

// CLOUDINARY ROUTE - Managing Images

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

// ...


module.exports = router;
