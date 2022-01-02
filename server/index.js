const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const config = require("./config");
const categoryRoute = require("./routes/categoryRoute");
const authorRoute = require("./routes/authorRoute");
const quoteRoute = require("./routes/quoteRoute");
const userRoute = require("./routes/userRoute");
const User = require("./models/userModel");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => res.send("Hello all"));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla' 
  }));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use("/api/categories", categoryRoute);
app.use("/api/authors", authorRoute);
app.use("/api/quotes", quoteRoute);
app.use("/api/users", userRoute);

mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.log(`we got error ${error}`));

app.listen(config.PORT, () => {
    console.log("express server running");
});
