const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

//RUTAS DE AUTENTICACIÓN

// POST /auth/signup - To Create a new user in the database
router.post("/signup", async (req, res, next) => {
  console.log(req.body);

  const { name, email, password, phoneNumber, address } = req.body;
  console.log(email, password);
  //Validaciones:
  //1. Ver si toda la información (email, password) se recibe o si esta vacia
  if (!email || !password) {
    res.status(400).json({ errorMessage: "email and password are mandatory" });
    return; // stop the execution of the route
  }

  // 2. El password necesita configurarse de manera tal que sea suficientemente seguro
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    res
      .status(400)
      .json({ errorMessage: "password is not strong enough. It needs to have at least 8 characteres, one lowercase, one uppercase and one digit." });
    return;
  }

  // 3. El email también necesita una estructura apropiada de email
  const emailRegex = /^[_a-zA-Z0-9]([\-+_%.a-zA-Z0-9]+)?@([_+\-%a-zA-Z0-9]+)(\.[a-zA-Z0-9]{0,6}){1,2}([a-zA-Z0-9]$)/;
  if (emailRegex.test(email) === false) {
    res.status(400).json({ errorMessage: "email does not comply with email rules. It can not start with special characthers" });
    return;
  }

  try {
    // 4. Es necesario establecer que no puede haber dos usuarios con el mismo email
    const foundUser = await User.findOne({ email: email });
    if (foundUser !== null) {
      res.status(400).json({ errorMessage: "user already registered with that email" });
      return;
    }

    // hash the password (Mecanismo para mantener la contraseña segura)
    const hashPassword = await bcrypt.hash(password, 12);

    //5. Crear ususario:
    await User.create({
      name,
      email,
      password: hashPassword,
      phoneNumber,
      address,
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser !== null) {
      res.status(400).json({ errorMessage: "user already registered with that email" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
