const router = require("express").Router();
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT = Number(process.env.SALT);
const JWT_KEY = process.env.JWT_KEY;

router.post("/register", async (req, res) => {
    try {
        const { email, userName, password } = req.body;

        if (!email || !userName || !password) throw Error("Please provide all necissary information.");

        const newUser = new User({ email, userName, password: bcrypt.hashSync(password, SALT) });

        await newUser.save();

        const token = jwt.sign(
            { _id: newUser._id },
            JWT_KEY,
            { expiresIn: 60 * 60 * 24 * 14}
        )
        console.log(newUser);

        res.status(201).json({
            message: `User Created`,
            newUser,
            token
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `message: ${err}`
        })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) throw Error("Please provide all necessary information.");

        let foundUser = await User.findOne({ userName });

        if (!foundUser) throw Error("User not found")

        const correctPassword = await bcrypt.compare(password, foundUser.password);

        if(!correctPassword) throw Error("Incorrect password");

        const token = jwt.sign(
            { _id: foundUser._id },
            JWT_KEY,
            { expiresIn: 60 * 60 * 24 * 14 }
        )

        res.status(200).json({
            message: `Logged in`,
            foundUser,
            token
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `message: ${err}`
        })
    }
})

module.exports = router;