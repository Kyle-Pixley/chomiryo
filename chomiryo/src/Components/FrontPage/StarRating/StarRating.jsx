import React, { useState, useEffect } from 'react';
import Star from '../../../assets/yellow-star.png';
import HalfStar from '../../../assets/half-yellow-star.png';
import './StarRating.css';


function StarRating({ recipeRating, viewingRecipePage }) {

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
        } else if (recipeRating >=1.3 && recipeRating < 1.8) {
            return (
                <div>
                    <img
                        className='star-image full-star-image'
                        src={Star} />
                    <img
                        className='star-image half-star-image'
                        src={HalfStar} />
                </div>
            )
        } else if (recipeRating >= 1.8 && recipeRating < 2.3) {
            return (
                <div>
                    <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                </div>
            )
        } else if (recipeRating >= 2.3 && recipeRating < 2.8) {
            return (
                <div>
                    <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image half-star-image'
                        src={HalfStar} />
                </div>
            )
        } else if (recipeRating >= 2.8 && recipeRating < 3.3) {
            return (
                <div>
                    <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                </div>
            )
        } else if (recipeRating >= 3.3 && recipeRating < 3.8) {
            return (
                <div>
                    <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image half-star-image'
                        src={HalfStar} />
                </div>
            )
        } else if (recipeRating >= 3.8 && recipeRating < 4.3) {
            return (
                <div>
                    <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                </div>
            )
        } else if (recipeRating >= 4.3 && recipeRating < 4.8) {
            return (
                <div>
                    <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img 
                        className='star-image half-star-image'
                        src={HalfStar} />
                </div>
            )
        } else if (recipeRating >= 4.8) {
            return (
                <div>
                    <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                        <img
                        className='star-image full-star-image'
                        src={Star} />
                </div>
            )
        } else return editRating()
    }

    const editRating = () => {
        if(viewingRecipePage) {
            return 'viewing recipe page'
            // this is where clicking and rating come into play
        } else return 'not viewing recipe page'
    }

  return (
    <div>
        {handleRecipeRatingToStars()}
    </div>
  )
}

export default StarRating;