const express = require("express");
const Author = require("../models/authorModel");
const ObjectId = require("mongoose").Types.ObjectId;
const { isAuth, isAdmin } = require("../auth");

const router = express.Router();

router.get("/", isAuth, isAdmin, async (req, res) => {
    const { page, limit } = req.query;
    console.log(page);
    console.log(limit);
    const authors = await Author
                            .find({})
                            .select({ name: 1, image: 1 })
                            .sort({ createdAt: "desc" })
                            .limit(limit)
                            .skip((page - 1) * limit)
                            .exec();
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

router.post("/", isAuth, isAdmin, (req, res) => {
    const author = new Author({
        name: req.body.name,
        featured: req.body.featured,
        description: req.body.description,
        shortIntro: req.body.shortIntro,
        image: req.body.image
    });
    
    author.save().then((newAuthor) => {
        res.status(201).send({ message: 'Author created successfully.', data: newAuthor });
    }).catch(() => {
        res.status(500).send({ message: 'Could not create new author' });
    });
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

router.get("/find/author", isAuth, isAdmin, (req, res) => {
    const name = req.query.name;
    Author.find({ name: { $regex: ".*" + name + ".*", $options: "i" } })
      .select({ name: 1 })
      .exec()
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/:id", isAuth, isAdmin, (req, res) => {
    Author.findByIdAndRemove(req.params.id).then(() => {
        res.status(201).send({ message: "Deleted successfully" })
    }).catch((error) => {
        res.status(500).send({ message: error })
    });
});

module.exports = router;
