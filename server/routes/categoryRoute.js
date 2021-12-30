const express = require("express");
const { Category } = require("../models/categoryModel");
const ObjectId = require("mongoose").Types.ObjectId;

const router = express.Router();


router.get("/", async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
});

router.get("/:id", async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "Invalid Category ID"});
    };

    const category = await Category.findById(req.params.id);
    if (category) {
        res.send(category);
    } else {
        res.status(404).send({ message: 'Category Not Found.' });
    }
});

router.post("/", async (req, res) => {
    const category = new Category({
        name: req.body.name,
        weight: req.body.weight
    });
    const newCategory = await category.save();
    if (newCategory) {
        res.status(201).send({ message: 'Category created successfully.', data: newCategory });
    } else {
        res.status(500).send({ message: 'Could not create new category' });
    }
});

module.exports = router;
