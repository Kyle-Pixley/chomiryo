const { mongoose } = require("../DBConn");
const { ObjectId } = mongoose.Schema;

const Comment = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            required: true
        },
        postReceiver: {
            type: ObjectId,
            ref: 'post',
            required: true
        },
        body: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("comment", Comment);