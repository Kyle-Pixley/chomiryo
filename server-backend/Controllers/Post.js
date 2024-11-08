const router = require("express").Router();
const Post = require("../Models/Post");
const addRating = require("../Middlewares/ratingMiddleware");
const sessionValidation = require("../Middlewares/Session");

router.post("/create", sessionValidation, async (req, res) => {
    try {
        const { title, instructions } = req.body;
        const rating = 0;

        if (!title || !instructions.ingredients || !instructions.steps) throw Error("Please provide all information for the recipe.");
        console.log(req.user)
        const newPost = new Post({
            user: req.user.id,
            title,
            instructions,
            rating
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

//update post and find the post by id
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

//todo make search posts by ingredients 
router.get('/', sessionValidation, async (req, res) => {
    try {
        const posts = 
            await Post.find({})
                .populate("user", "userName")
        if (posts.length === 0) throw Error("No posts found");
        res.status(200).json(posts)

    } catch(err) {
        console.log(err);
        res.status(500).json({ message: `Error: Could not get Posts`})
    }
});

// retrieves one Post by id
router.get('/:id', sessionValidation, async (req, res) => {
    try {
        const { id } = req.params;

        const recipe = await Post.findById(id);

        if(!recipe) {
            return res.status(404).json({ error: 'Recipe Not Found'});
        };

        res.json(recipe);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error'});
    }
});

//Adds or updates post rating
router.post('/rate/:postId', sessionValidation, async (req, res) => {
    try {
        const { postId } = req.params;
        const { rating } = req.body;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Recipe not found"})

        const updatedAverageRating = await addRating(post, userId, rating);

        res.status(200).json({
            message: "Rating updated",
            averageRating: updatedAverageRating
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Could not update rating: ${err.message}`})
    }
});

module.exports = router;