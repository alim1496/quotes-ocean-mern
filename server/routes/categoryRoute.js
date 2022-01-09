const express = require("express");
const Category = require("../models/categoryModel");
const ObjectId = require("mongoose").Types.ObjectId;
const { isAuth, isAdmin } = require("../auth");

const router = express.Router();


router.get("/", isAuth, isAdmin, async (req, res) => {
    const categories = await Category.find({}).sort({ createdAt: "desc" }).exec();
    res.send(categories);
});

router.get("/:id", isAuth, isAdmin, async (req, res) => {
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

router.post("/", isAuth, isAdmin, (req, res) => {
    const category = new Category({
        name: req.body.name,
        weight: req.body.weight
    });
    category
        .save()
        .then((newCategory) => {
            res.status(201).send({ message: 'Category created successfully.', data: newCategory });
        })
        .catch(() => {
            res.status(500).send({ message: 'Could not create new category' });
        });
});

router.patch("/:id", isAuth, isAdmin, (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "Invalid Category ID"});
    };
    Category
        .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((category) => res.send(category))
        .catch((error) => res.status(500).send({ message: error }));
});

router.delete("/:id", isAuth, isAdmin, (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(() => {
        res.status(201).send({ message: "Deleted successfully" })
    }).catch((error) => {
        res.status(500).send({ message: error })
    });
});

module.exports = router;
