const router = require("express").Router();
const Post = require("../Models/Post");
const sessionValidation = require("../Middlewares/Session");

router.post("/create", sessionValidation, async (req, res) => {
    try {
        const { title, instructions } = req.body;

        if (!title || !instructions.ingredients || !instructions.steps) throw Error("Please provide all information for the recipe.");

        const newPost = new Post({
            user: req.user.id,
            title,
            instructions
        });

        const savedPost = await newPost.save();

        res.status(201).json({
            message: `New recipe created`,
            savedPost
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: `Could not create new recipe: ${err}`});
    }
});

router.put("/updatepost/:id", sessionValidation, async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, instructions } = req.body;

        const foundPost = await Post.findById(postId);

        if (!foundPost) throw Error("Post not found");

        if (foundPost.user.toString() !== req.user._id.toString()) throw Error("you do not have permission to edit this recipe")
        
        if (title) foundPost.title = title;
        if (instructions) foundPost.instructions = instructions;

        const updatedPost = await foundPost.save();

        res.status(200).json(updatedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error could not update recipe"})
    }
});
//todo make get all posts + search posts 

module.exports = router;