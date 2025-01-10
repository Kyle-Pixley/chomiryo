require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { dbConnect } = require("./DBConn");
const JWT = require("jsonwebtoken");
const cors = require("cors");

const JWT_KEY = process.env.JWT_KEY;
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "4000";

const authController = require("./Controllers/Auth");
const postController = require("./Controllers/Post");
const commentController = require("./Controllers/Comment");
const nodemailerController = require("./Controllers/NodeMailer");
const utilitiesController = require("./Controllers/Utilities");
const sessionValidation = require("./Middlewares/Session");


app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/auth", authController);
app.use("/post", sessionValidation, postController);
app.use("/comment", sessionValidation, commentController);
app.use("/email", nodemailerController);
app.use("/utilities", utilitiesController);


app.listen(PORT, HOST, () => {
    console.log(`[server] is listening on ${HOST}:${PORT}`);
    dbConnect();
});
