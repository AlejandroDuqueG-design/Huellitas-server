const express = require("express");
const router = express.Router();
const Adoption = require("../models/Adoption.model");

//ADOPT ROUTES
//POST /api/auth/adoption - Para crear una nueva entrada de Solicitud de Adopción
router.post("/", async (req, res, next) => {
  console.log(req.body);

  const { dog, user, adoptionRequestState, requestDate, resolutionDate, comments } = req.body;

  try {
    const response = await Adoption.create({
      dog,
      user,
      adoptionRequestState,
      requestDate,
      resolutionDate,
      comments
    });
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
  }
});

//GET /api/auth/adoption - Accede a la lista de todos las solicitudes de adopción creadas
router.get("/", async (req, res, next) => {
  try {
    const response = await Adoption.find();
    res.status(202).json(response);
  } catch (error) {
    console.log(error, "Checking route");
  }
});

//GET /api/auth/adoption/:adoptionId - Se recibe la información de una sola solicitud de adopción
router.get("/:adoptionId", async (req, res, next) => {
  try {
    const response = await Adoption.findById(req.params.adoptionId);
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
});

//PATCH /api/auth/adoption/:adoptionId - Actualiza una propiedad de una solicitud de adopción
router.patch("/:adoptionId", async (req, res, next) => {
  const { dog, user, adoptionRequestState, requestDate, resolutionDate, comments } = req.body;
  try {
    const response = await Adoption.findByIdAndUpdate(
      req.params.adoptionId,
      {
        dog,
        user,
        adoptionRequestState,
        requestDate,
        resolutionDate,
        comments,
      },
      { new: true }
    );
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
});

//DELETE /api/auth/adoption/:adoptionId - Elimina una unica solicitud de adopción
router.delete("/:adoptionId", async (req, res, next) => {
  try {
    const response = await Adoption.findByIdAndDelete(req.params.adoptionId);
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
});

//GET /api/auth/adoption/:userId - Se reciben todas las solicitudes de adopción hechas por un solo usuario
router.get("/:userId", async (req, res, next) => {
  try {
    const response = await Adoption.find();
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
});

//GET /api/auth/adoption/:dogId - Se reciben todas las solicitudes de adopción hechas para un solo perro
router.get("/:dogId", async (req, res, next) => {
  try {
    const response = await Adoption.findById({dog: req.params.dogId}).populate("dog");
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
