const express = require("express");
const passport = require("passport");
const User = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;
const { getToken, isAdmin } = require("../auth");

const router = express.Router();

router.post("/login", passport.authenticate("local"), isAdmin, (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            res.status(500).send({ message: `something went wrong ${err}`});
        } else {
            res.status(202).send({ message: "Logged in successfully", token: getToken(user), name: user.username });
        }
    });
});

router.post("/signup", (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        admin: false
    });
    User.register(user, req.body.password, (err, _user) => {
        if (err) {
            res.status(500).send({ message: `something went wrong ${err}`});
        } else {
            res.status(201).send({ message: "Account created successfully" });
        }
    });
});

router.post("/check-unique-username", async (req, res) => {
    const name = await User.findOne({ username: req.body.username });
    if (name) {
        res.status(404).send({ message: "username exists" });
    } else {
        res.status(202).send({ message: "username does not exist" });
    }
});

router.post("/check-unique-email", async (req, res) => {
    const name = await User.findOne({ email: req.body.email });
    if (name) {
        res.status(404).send({ message: "email exists" });
    } else {
        res.status(202).send({ message: "email does not exist" });
    }
});

module.exports = router;
