const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
