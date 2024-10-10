const express = require("express");
const router = express.Router();
const Pet = require("../models/pet");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.render("pets/index", { pets });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving pets");
  }
});

router.get("/new", (req, res) => {
  res.render("pets/new");
});

router.post("/", async (req, res) => {
  try {
    req.body.hasOwner = req.body.hasOwner === "true";
    await Pet.create(req.body);
    res.redirect("/pets");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating pet");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).send("Pet not found");
    }
    res.render("pets/show", { pet });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving pet");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).send("Pet not found");
    }
    res.render("pets/edit", { pet });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving pet for edit");
  }
});

router.put("/:id", async (req, res) => {
  try {
    req.body.hasOwner = req.body.hasOwner === "true";
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!pet) {
      return res.status(404).send("Pet not found");
    }
    res.redirect("/pets");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating pet");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).send("Pet not found");
    }
    res.redirect("/pets");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting pet");
  }
});

module.exports = router;
