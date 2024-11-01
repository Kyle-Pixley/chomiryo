require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("bcrypt");
const { dbConnect } = require("./DBConn");
const JWT = require("jsonwebtoken");
const cors = require("cors");

// const JWT_KEY = process.env.JWT_KEY;
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "4000";

// todo Controllers require("controllers")

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// app.use("/auth", authController);
// etc....

app.listen(PORT, HOST, () => {
    console.log(`[server] is listening on ${HOST}:${PORT}`);
    dbConnect();
});
