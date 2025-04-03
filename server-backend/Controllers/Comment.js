const router = require("express").Router();
const Comment = require("../Models/Comment");
const sessionValidation = require("../Middlewares/Session");

//create a comment for a specific post
router.post("/create/:postId", sessionValidation, async (req, res) => {
    try {

        const { postId } = req.params;
        const { body } = req.body;

        let commentData = {
            user: req.user,
            postReceiver: postId,
            body
        }

        const newComment = await new Comment(commentData);

        await newComment.save();

        await newComment.populate("user");


        res.status(201).json({
            message: `Comment created`,
            newComment
        });
    } catch(err) {
        res.status(500).json({
            message: err.message
        });
    }
})

//get all comments for a specific post
router.get('/:postId', sessionValidation, async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ postReceiver: postId }).populate("user","body");

        res.status(200).json({
            comments,
            message: 'comments received'
        });
    } catch(err) {
        res.status(500).json({ message: `error could not get comments`})
    }
});

module.exports = router;