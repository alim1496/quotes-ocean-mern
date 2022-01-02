const express = require("express");
const Author = require("../models/authorModel");
const ObjectId = require("mongoose").Types.ObjectId;
const { isAuth, isAdmin } = require("../auth");

const router = express.Router();

router.get("/", isAuth, isAdmin, async (req, res) => {
    const authors = await Author.find();
    res.send(authors);
});

router.get("/:id", isAuth, isAdmin, async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "Invalid Author ID"});
    };

    const author = await Author.findById(req.params.id);
    if (author) {
        res.send(author);
    } else {
        res.status(404).send({ message: "Author not found "});
    }
});

router.post("/", isAuth, isAdmin, async (req, res) => {
    const author = new Author({
        name: req.body.name,
        featured: req.body.featured,
        description: req.body.description,
        shortIntro: req.body.shortIntro,
        image: req.body.image
    });
    const newAuthor = await author.save();
    if (newAuthor) {
        res.status(201).send({ message: 'Author created successfully.', data: newAuthor });
    } else {
        res.status(500).send({ message: 'Could not create new author' });
    }
});

router.patch("/:id", isAuth, isAdmin, (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "Invalid Author ID"});
    };
    Author
        .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((author) => res.send(author))
        .catch((error) => res.status(500).send({ message: error }));
});

module.exports = router;
