const mongoose = require("mongoose");
const { categorySchema } = require("../models/categoryModel");
const { authorSchema } = require("./authorModel");

const quoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    category: {
        type: categorySchema,
        required: true
    },
    author: {
        type: authorSchema,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Published", "Rejected"],
        default: "Pending"
    }
});

const quoteModel = mongoose.model("Quote", quoteSchema);

module.exports = quoteModel;
