const jwt = require("jsonwebtoken");
const config = require("./config");

const getToken = (user) => {
    const { username, email, admin, salt } = user;
    return jwt.sign({
        username,
        email,
        admin,
        salt
    },
    config.JWT_SECRET,
    {
        expiresIn: '48h',
    });
};

const isAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        jwt.verify(token, config.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ message: "Invalid token" });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: "Token is not supplied" });
    }
};

const isAdmin = (req, res, next) => {
    const { user } = req;
    if (!user || !user.admin) {
        res.status(403).send({ message: "Admin role required" });
    } else {{
        next();
    }}
};

module.exports = { getToken, isAuth, isAdmin };
