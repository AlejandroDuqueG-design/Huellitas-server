const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog.model");
const { validateToken, validateAdminRole } = require("../middlewares/auth.middlewares");

//DOG ROUTES
//POST /api/auth/dog - Para crear una nueva entrada de Perro (Nivel Admin)
router.post("/", validateToken, validateAdminRole, async (req, res, next) => {
  console.log(req.body);

  const { name, age, breed, sex, size, adoptionRequestState, image, entryDate, description } = req.body;
  try {
    const response = await Dog.create({
      name,
      age,
      breed,
      sex,
      size,
      adoptionRequestState,
      image,
      entryDate,
      description,
    });
    res.status(201).json(response);
  } catch (error) {
    console.log(error) ;
    next(error)
  }
});

//GET /api/auth/dogs - Accede a la lista de todos los perros creados
router.get("/", async (req, res, next) => {
  try {
    const response = await Dog.find();
    res.status(202).json(response);
  } catch (error) {
    console.log(error, "Checking route");
  }
});

//GET /api/auth/dog/:dogId - Se recibe la información de un solo perro
router.get("/:dogId", async (req, res, next) => {
  try {
    const response = await Dog.findById(req.params.dogId);
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
});

//PATCH /api/auth/dos/:dogId - Actualiza una propiedad de un perro
router.patch("/:dogId", validateToken, validateAdminRole, async (req, res, next) => {
  const { name, age, breed, sex, size, adoptionRequestState, image, entryDate, description } = req.body;
  try {
    const response = await Dog.findByIdAndUpdate(
      req.params.dogId,
      {
        name,
        age,
        breed,
        sex,
        size,
        adoptionRequestState,
        image,
        entryDate,
        description,
      },
      { new: true }
    );
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
});

//DELETE /api/auth/dos/:dogId - Elimina un unico perro
router.delete("/:dogId", validateToken, validateAdminRole, async (req, res, next) => {
  try {
    const response = await Dog.findByIdAndDelete(req.params.dogId);
    console.log(response);
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
