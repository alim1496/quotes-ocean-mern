const mongoose = require("mongoose");

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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
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
