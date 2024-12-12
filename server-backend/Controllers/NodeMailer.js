const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

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

module.exports = router;