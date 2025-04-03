const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const JWT_KEY = process.env.JWT_KEY;

const sessionValidation = async (req, res, next) => {
    try {
        if (req.method === "OPTIONS") {
            return next();
        }

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json({ message: "No authorization header" });
        }

        const authToken = authHeader.includes("Bearer")
            ? authHeader.split(" ")[1]
            : authHeader;
        
        const payload = authToken ? jwt.verify(authToken, JWT_KEY) : null;
        if (!payload) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const findUser = await User.findOne({ _id: payload._id });
        if (!findUser) {
            return res.status(404).json({ message: "Users not found" })
        }

        req.user = findUser;
        next();
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = sessionValidation;