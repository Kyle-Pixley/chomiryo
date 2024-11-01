const { mongoose } = require("../DBConn");
const { ObjectId } = mongoose.Schema;

const User = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("user", User);