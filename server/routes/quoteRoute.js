const express = require("express");
const Quote = require("../models/quoteModel");
const Category = require("../models/categoryModel");
const Author = require("../models/authorModel");
const ObjectId = require("mongoose").Types.ObjectId;
const { isAuth, isAdmin } = require("../auth");

const router = express.Router();

router.get("/", isAuth, isAdmin, async (req, res) => {
    const quotes = await Quote
                            .find({})
                            .populate([
                                {
                                    path: "author",
                                    select: "name"
                                },
                                {
                                    path: "category",
                                    select: "name"
                                }
                            ])
                            .exec();
    res.send(quotes);
});

router.get("/statistics/count", isAuth, isAdmin, async (req, res) => {
    const quotes = await Quote.find().count();
    const categories = await Category.find().count();
    const authors = await Author.find().count();
    const featured = await Quote.find().count({ featured: true });
    const featuredAuthor = await Author.find().count({ featured: true });
    const start = new Date();
    const end = new Date();
    start.setHours(0,0,0,0);
    end.setHours(23,59,59,999);
    const quotesToday = await Quote.find().count({ createdAt: {$gte: start, $lt: end}});
    const authorsToday = await Author.find().count({ createdAt: {$gte: start, $lt: end}});
    const data = { quotes, categories, authors, featured, featuredAuthor, quotesToday, authorsToday };
    res.send({
        quotes: data.quotes, 
        categories: data.categories, 
        authors: data.authors, 
        featured: data.featured, 
        featuredAuthor: data.featuredAuthor,
        quotesToday: data.quotesToday,
        authorsToday: data.authorsToday
    });
});

router.get("/:id", isAuth, isAdmin, (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: "Invalid Quote ID"});
    };

    Quote
        .findById(req.params.id)
        .populate("author", { name: 1})
        .populate("category", { name: 1 })
        .exec()
        .then((quote) => res.send(quote))
        .catch(() => res.status(404).send({ message: "Quote not found "}));
    
});

router.post("/", isAuth, isAdmin, (req, res) => {
    new Quote({
        title: req.body.title,
        featured: req.body.featured,
        status: req.body.status,
        category: req.body.category,
        author: req.body.author
    })
    .save()
    .then((quote) => res.status(201).send({ message: 'Quote created successfully.', data: quote }))
    .catch(() => res.status(500).send({ message: 'Could not create new quote' }));
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

router.get("/latest/five", isAuth, isAdmin, async (req, res) => {
    const quotes = await Quote
                            .find({})
                            .limit(5)
                            .populate({
                                path: "author",
                                select: "name"
                            })
                            .sort({ createdAt: "desc" })
                            .exec();
    res.send(quotes);
});

module.exports = router;
