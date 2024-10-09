const express = require('express');
const router = express.Router();
const Pet = require('../models/pet');

router.get('/', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.render('pets/index', { pets });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving pets");
    }
});

router.get('/new', (req, res) => {
    res.render('pets/new');
});

router.post('/', async (req, res) => {
    try {
        await Pet.create(req.body);
        res.redirect('/pets'); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating pet");
    }
});

router.get('/:id', async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        res.render('pets/show', { pet });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving pet");
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        res.render('pets/edit', { pet });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving pet for edit");
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Pet.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/pets');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating pet");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.redirect('/pets');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting pet");
    }
});

module.exports = router;
