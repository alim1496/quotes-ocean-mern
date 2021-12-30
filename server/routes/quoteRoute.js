const express = require("express");
const Quote = require("../models/quoteModel");
const ObjectId = require("mongoose").Types.ObjectId;

const router = express.Router();

router.get("/", async (req, res) => {
    const quotes = await Quote.find();
    res.send(quotes);
});

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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

module.exports = router;
