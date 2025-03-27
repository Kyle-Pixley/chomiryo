const addRating = async (post, userId, newRating) => {
    try {

        //checks to see if the user has already rated the recipe(post)
        const existingRatingIndex = post.ratings.findIndex(
            (rating) => rating.userId.toString() === userId.toString()
        );

        //if no rating found (above equalling -1) adds new rating else updates the one that already exists
        if (existingRatingIndex !== -1) {
            post.ratings[existingRatingIndex].rating = newRating;
        } else {
            post.ratings.push({ userId, rating: newRating});
        }

        //finds the average of all the ratings 
        const totalRatings = post.ratings.reduce((sum, rating) => sum + rating.rating, 0);
        post.averageRating = totalRatings / post.ratings.length;

        await post.save();
        return post.averageRating;
    } catch (err) {
        throw new Error(`Failed to update rating: ${err.message}`);
    }
};

module.exports = addRating;