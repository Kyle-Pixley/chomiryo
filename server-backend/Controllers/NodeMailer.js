const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require("../Models/User");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});
// todo test route ----------------------
router.post('/send-email', async (req,res) => {
    const { to, text } = req.body;
    const subject = "Reset Chomiryo Account Password"
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text,
        });
        res.json({ success: true, message: 'email sent'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Email failed to send'})
    }
});
//todo -------------------------------------

// find user by email and send a password reset link
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const secretKey = process.env.JWT_KEY;
console.log('forgot password route hit')
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found'});

        const resetToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h'});

        user.resetToken = resetToken;
        await user.save();

        const resetLink = `http://127.0.0.1:5173/reset-password?token=${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset',
            text: resetLink,
        });
        res.status(200).json({ message: 'reset link sent'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'server error'})
    }
});

//verifies token
router.get('/reset-password', async (req,res) => {
    const { token } = req.query;
    const secretKey = process.env.JWT_KEY;

    try {
        jwt.verify(token, secretKey);

        if(User.resetToken !== token) throw Error({ message: 'Invalid Token' });

        res.status(200).json({ message: 'Token is valid' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Invalid or expired token'});
    }
});

//updates users password
router.post('./reset-password', async (req,res) => {
    const { token, newPassword } = req.body;
    const secretKey = process.env.JWT_KEY;

    try{
        const payload = jwt.verify(token, secretKey);
        const user = await User.findById(payload.userId);
        if(!user) return res.status(404).json({ message: 'User not found' });

        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated'});
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: 'Invalid or expired token'});
    }
});

module.exports = router;