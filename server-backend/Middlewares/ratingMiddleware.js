const addRating = async (post, userId, newRating) => {
    try {

        post.ratings = post.ratings

        const existingRatingIndex = post.ratings.findIndex(
            (rating) => rating.userId.toString() === userId.toString()
        );

        if (existingRatingIndex !== -1) {
            post.ratings[existingRatingIndex].rating = newRating;
        } else {
            post.ratings.push({ userId, rating: newRating});
        }

        const totalRatings = post.ratings.reduce((sum, rating) => sum + rating.rating, 0);
        post.averageRating = totalRatings / post.ratings.length;

        await post.save();
        return post.averageRating;
    } catch (err) {
        throw new Error(`Failed to update rating: ${err.message}`);
    }
};

module.exports = addRating;