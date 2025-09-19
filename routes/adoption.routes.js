const express = require("express");
const router = express.Router();
const Adoption = require("../models/Adoption.model");
const { validateToken, validateAdminRole } = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

//ADOPT ROUTES - USER LEVEL
//POST /api/adoption - Usuario puede crear una nueva entrada de Solicitud de Adopción
router.post("/", validateToken, async (req, res, next) => {
  console.log(req.body);

  // Verificar en la DB (Deposito Adopción) que no haya un formulario de adopción que no sea del mismo Id de usuario para el mismo Id de perro
  try {
    //La función foundAdoptionRequest fue para checkear antes de crear la solicitud de adopción, que no exista ya una solicitud de adopción con un mismo usuario hacia un mismo perro
    // El mismo usuario NO puede crear varias solicitudes de adopción hacia el mismo perro
    const foundAdoptionRequest = await Adoption.findOne({ user: req.payload._id, dog: req.body.dog });
    if (foundAdoptionRequest !== null) {
      res.status(400).json({ errorMessage: "Adoption form request already exist with the same user and the same dog"});
      return;
    }
    const response = await Adoption.create({
      user: req.payload._id,
      dog: req.body.dog,
      adoptionRequestState: req.body.adoptionRequestState,
      resolutionDate: req.body.resolutionDate,
      comments: req.body.comments,
    });
    console.log(response)
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
  }
});

//GET /api/adoption/ - Usuario Accede a la lista de todos SUS solicitudes de adopción
router.get("/", validateToken, async (req, res, next) => {
  try {
    const response = await Adoption.find({ user: req.payload._id }).populate("dog", "name").populate("user", "name"); //Garantizar que solo el user puede cambiar sus propios datos
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error, "Checking route");
  }
});

//GET /api/adoption/:adoptionId - Usuario recibe los detalles de una sola solicitud de adopción
router.get("/:adoptionId", validateToken, async (req, res, next) => {
  try {
  const response = await Adoption.findById(req.params.adoptionId).populate("dog", "name").populate("user", "name")
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
    next(error)
  }
});

//PATCH /api/adoption/:adoptionId - El usuario Actualiza una propiedad de una solicitud de adopción hecha por el usuario
router.patch("/:adoptionId", validateToken, async (req, res, next) => {
  const { dog, user, requestDate, resolutionDate,  } = req.body;
  try {
    const response = await Adoption.findByIdAndUpdate(
      req.params.adoptionId,
      {
        dog,
        user,
        requestDate,
        resolutionDate
      },
      { new: true }
    );
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
});

//ADOPT ROUTES - ADMIN LEVEL
//GET /api/adoption/:userId - Admin recibe todas las solicitudes de adopción hechas por un solo usuario para cualquier perro
router.get("/user/:userId", validateToken, validateAdminRole, async (req, res, next) => {
  try {
    console.log("Testing/ Adoptions for user")
    const response = await Adoption.find();
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
});

//GET /api/adoption/:dogId - Admin recibe todas las solicitudes de adopción hechas por cualquier usuario, para un solo perro
router.get("/dog/:dogId", validateToken, validateAdminRole, async (req, res, next) => {
  try {
    const response = await Adoption.find();
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
});

//DELETE /api/adoption/:adoptionId - Elimina una unica solicitud de adopción
router.delete("/:adoptionId", validateToken, validateAdminRole, async (req, res, next) => {
  try {
    const response = await Adoption.findByIdAndDelete(req.params.adoptionId);
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
