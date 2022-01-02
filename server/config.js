const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/quotes-ocean-db',
    JWT_SECRET: 'very2very3strong8secret'
};
