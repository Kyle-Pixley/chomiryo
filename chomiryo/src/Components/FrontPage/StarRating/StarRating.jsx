import React, { useState, useEffect } from 'react';
import Star from '../../../assets/yellow-star.png';
import HalfStar from '../../../assets/half-yellow-star.png';
import './StarRating.css';


function StarRating({ recipeRating}) {

    const handleRecipeRatingToStars = () => {
        if(recipeRating === 0) {
            return 'No Rating'
        } else if(recipeRating > 0 && recipeRating < 1) {
            return (
                <img 
                    className='star-image half-star-image' 
                    src={HalfStar} />
            )
        } else if(recipeRating >= 1 && recipeRating < 1.3) {
            return (
                <img
                    className='star-image full-star-image'
                    src={Star} />
            )
        } else return 'Good'
    }

  return (
    <div>
        {handleRecipeRatingToStars()}
    </div>
  )
}

export default StarRating