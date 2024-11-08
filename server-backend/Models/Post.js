const { mongoose } = require("../DBConn");
const { ObjectId } = mongoose.Schema;

const Post = new mongoose.Schema (
    {
        user: {
            type: ObjectId,
            ref: "user",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        ratings: {
            type: [
                {
                    userId: { 
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User"
                    },
                    rating: { 
                        type: Number,
                        min: 1, 
                        max: 5
                    }
                }
            ],
            default: []
        },
        averageRating: {
            type: Number,
            default: 0
        },
        instructions: {
            ingredients: {
                type: Array,
                required: true
            },
            steps: {
                type: Array,
                required: true
            }
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("post", Post);