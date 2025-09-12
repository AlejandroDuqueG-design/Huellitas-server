const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

//USER ROUTES

//GET /api/auth/user - Accede a la lista de todos las usuarios registrados
router.get("/", async (req, res, next) => {
  try {
    const response = await User.find();
    res.status(202).json(response);
  } catch (error) {
    console.log(error, "Checking route");
  }
});

//GET /api/auth/user/:userId - Se recibe los detalles de la información de un solo ususario
router.get("/:userId", async (req, res, next) => {
  try {
    const response = await User.findById(req.params.userId);
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
});

//PATCH /api/auth/user/:userId - Actualiza una propiedad de la información de un usuario
router.patch("/:userId", async (req, res, next) => {
  const { name, email, password, phoneNumber, address } = req.body;
  try {
    const response = await User.findByIdAndUpdate(
      req.params.userId,
      {
       name, 
       email, 
       password, 
       phoneNumber, 
       address
      },
      { new: true }
    );
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
});

//DELETE /api/auth/user/:userId - Elimina a un unico usuario
router.delete("/:userId", async (req, res, next) => {
  try {
    const response = await User.findByIdAndDelete(req.params.userId);
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;