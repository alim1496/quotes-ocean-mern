const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    weight: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
