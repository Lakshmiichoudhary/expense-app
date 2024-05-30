const jwt = require("jsonwebtoken");
const User = require("../models/user");
require('dotenv').config();

const authenticate = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("Authentication Failed! No token provided.");
        return res.status(401).json({ message: "Authentication failed" });
    }
    
    const token = authHeader.replace("Bearer ", "");
    console.log(token)
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        User.findOne({ where: { id: decoded.id } })
            .then((result) => {
                if (result) {
                    req.user = result;
                    next();
                } else {
                    console.log("Authentication Failed! User not found.");
                    res.status(401).json({ message: "Authentication failed" });
                }
            })
            .catch((err) => {
                console.log("Authentication Failed! Database error.");
                res.status(500).json({ message: "Authentication failed" });
            });
    } catch (error) {
        console.log("Authentication Failed! Invalid token.");
        return res.status(401).json({ message: "Authentication failed" });
    }
};

module.exports = authenticate;