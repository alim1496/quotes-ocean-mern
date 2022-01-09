const express = require("express");
const Quote = require("../models/quoteModel");
const ObjectId = require("mongoose").Types.ObjectId;
const { isAuth, isAdmin } = require("../auth");

const router = express.Router();

router.get("/", isAuth, isAdmin, async (req, res) => {
    const quotes = await Quote.find({}).populate("author", { name: 1 }).populate("category", { name: 1 }).sort({ createdAt: "desc" }).exec();
    res.send(quotes);
});

router.get("/:id", isAuth, isAdmin, async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "Invalid Quote ID"});
    };

    const quote = await Quote.findById(req.params.id);
    if (quote) {
        res.send(quote);
    } else {
        res.status(404).send({ message: "Quote not found "});
    }
});

router.post("/", isAuth, isAdmin, async (req, res) => {
    const quote = new Quote({
        title: req.body.title,
        featured: req.body.featured,
        status: req.body.status,
        category: req.body.category,
        author: req.body.author
    });
    const newQuote = await quote.save();
    if (newQuote) {
        res.status(201).send({ message: 'Quote created successfully.', data: newQuote });
    } else {
        res.status(500).send({ message: 'Could not create new quote' });
    }
});

router.patch("/:id", isAuth, isAdmin, (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "Invalid Quote ID"});
    };
    Quote
        .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((quote) => res.send(quote))
        .catch((error) => res.status(500).send({ message: error }));
});

router.delete("/:id", isAuth, isAdmin, (req, res) => {
    Quote.findByIdAndRemove(req.params.id).then(() => {
        res.status(201).send({ message: "Deleted successfully" })
    }).catch((error) => {
        res.status(500).send({ message: error })
    });
});

module.exports = router;
