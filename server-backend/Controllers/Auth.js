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

        if(!correctPassword) throw Error("Incorrect Password");

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
            message: err.message
        })
    }
});

//todo fix route it is not actually changing the password and probably need to incorporate bcrypt
router.put('/updatePassword/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { password } = req.body;

        const foundUser = await User.findById(userId);

        if (!foundUser) throw Error("User Not Found");

        if (!password) throw Error("No New Password");

        const updatedUser = await foundUser.save();

        res.status(200).json(updatedUser);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error could not update password"})
    }
});
//todo ========================================================

//find one user by email 
router.post("/find-email", async (req, res) => {
    try {
        const { email } = req.body;

        if(!email) throw Error("Please Enter Email");

        let foundUser = await User.findOne({ email });

        if(!foundUser) throw Error("No User With This Email found");

        res.status(200).json({
            message: 'User Found',
            foundUser
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    }
});

//get user by id 
router.get("/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const foundUser = await User.findOne({ _id: user_id});
        if (!foundUser) throw Error("User not found");

        res.status(200).json({
            message: "Found User",
            foundUser
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;