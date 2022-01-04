const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    shortIntro: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
}, { timestamps: true });

const authorModel = mongoose.model("Author", authorSchema);

module.exports = authorModel;
