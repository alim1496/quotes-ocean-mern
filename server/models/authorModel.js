const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
        type: [String],
        required: true
    },
    image: {
        type: String,
        validate: {
            validator: (v) => {
                const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
                return urlRegex.test(v);
            }
        }
    }
}, { timestamps: true });

const authorModel = mongoose.model("Author", authorSchema);

exports.authorModel = authorModel;
exports.authorSchema = authorSchema;
