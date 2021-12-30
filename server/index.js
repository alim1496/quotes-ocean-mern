const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const categoryRoute = require("./routes/categoryRoute");
const authorRoute = require("./routes/authorRoute");
const quoteRoute = require("./routes/quoteRoute");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => res.send("Hello all"));

app.use("/api/categories", categoryRoute);
app.use("/api/authors", authorRoute);
app.use("/api/quotes", quoteRoute);

mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.log(`we got error ${error}`));

app.listen(config.PORT, () => {
    console.log("express server running");
});
