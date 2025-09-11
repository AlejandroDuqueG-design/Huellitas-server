const express = require("express");
const router = express.Router();

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

// POST /auth/signup - To Create a new user in the database
router.post("/signup", async (req, res, next) => {
    console.log(req.body)

    const { name, email, password, phoneNumber, address} = req.body;

    // VALIDATIONS FOR USER ACCESS
    if (!username || !email || !password) {
    res.status(400).json({errorMessage: "Username, Email and Password are mandatory"})
    return 
  }
})