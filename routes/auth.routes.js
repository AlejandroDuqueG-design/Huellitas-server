const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { validateToken } = require("../middlewares/auth.middlewares");

//RUTAS DE AUTENTICACIÓN

// POST /auth/signup - Para crear un usuario en la Base de Datos
router.post("/signup", async (req, res, next) => {
  console.log(req.body);

  const { name, email, password, phoneNumber, address } = req.body;
  console.log(email, password);
  //Validaciones:
  //1. Confirmar si toda la información (email, password) se recibe o si esta vacia
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


//LOG IN  
/// POST /auth/login 
router.post("/login", async (req, res, next) => {
  const {email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({errorMessage: "email and password are mandatory"})
    return // stop the execution of the route
  }
  try {
    
    // the user needs to exist in the database
    const foundUser = await User.findOne({ email })
    console.log(foundUser)
    if (foundUser === null) {
      res.status(400).json({errorMessage: "there are no users registered with that email"})
      return
    }

    // the passwords should match
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if (isPasswordCorrect === false) {
      res.status(400).json({errorMessage: "the password is not correct"})
      return
    }
    
    // info from the user that will not change often
    const payload = {
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role
    }

    // proceed to create the Token
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "30d"
    })
  
    res.status(202).json({authToken})

  } catch (error) {
    next(error)
  }

});

// GET "/auth/verify" => validate the token and send the info of the user that has logged in (functionality only for the frontend)
router.get("/verify", validateToken, (req, res) => {
  res.status(200).json(req.payload) // sending to the FE the info from the logged in user.
})


module.exports = router;
