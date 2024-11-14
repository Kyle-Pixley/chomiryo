import React, { useEffect, useState } from 'react';
import Star from '../../../assets/yellow-star.png';
import HalfStar from '../../../assets/half-yellow-star.png';
import EmptyStar from '../../../assets/empty-star.png';
import './StarRating.css';


function StarRating({ recipeRating, viewingRecipePage }) {

    const [ starOneImage, setStarOneImage ] = useState('');
    const [ starTwoImage, setStarTwoImage ] = useState('');
    const [ starThreeImage, setStarThreeImage ] = useState('');
    const [ starFourImage, setStarFourImage ] = useState('');
    const [ starFiveImage, setStarFiveImage ] = useState('');

    const [ mouseLeave, setMouseLeave ] = useState(false);

    
    useEffect(() => {
        if (recipeRating > 0 && recipeRating < 1) {
            //half star
            setStarOneImage(HalfStar);
            setStarTwoImage(EmptyStar);
            setStarThreeImage(EmptyStar);
            setStarFourImage(EmptyStar);
            setStarFiveImage(EmptyStar);
        } else if(recipeRating >= 1 && recipeRating < 1.3) {
            // one star
            setStarOneImage(Star);
            setStarTwoImage(EmptyStar);
            setStarThreeImage(EmptyStar);
            setStarFourImage(EmptyStar);
            setStarFiveImage(EmptyStar);
        } else if(recipeRating >=1.3 && recipeRating < 1.8) {
            // one and a half stars
            setStarOneImage(Star);
            setStarTwoImage(HalfStar);
            setStarThreeImage(EmptyStar);
            setStarFourImage(EmptyStar);
            setStarFiveImage(EmptyStar);
        } else if(recipeRating >= 1.8 && recipeRating < 2.3) {
            // two stars
            setStarOneImage(Star);
            setStarTwoImage(Star);
            setStarThreeImage(EmptyStar);
            setStarFourImage(EmptyStar);
            setStarFiveImage(EmptyStar);
        } else if(recipeRating >= 2.3 && recipeRating < 2.8) {
            // two and a half stars
            setStarOneImage(Star);
            setStarTwoImage(Star);
            setStarThreeImage(HalfStar);
            setStarFourImage(EmptyStar);
            setStarFiveImage(EmptyStar);
        } else if(recipeRating >= 2.8 && recipeRating < 3.3) {
            // three stars
            setStarOneImage(Star);
            setStarTwoImage(Star);
            setStarThreeImage(Star);
            setStarFourImage(EmptyStar);
            setStarFiveImage(EmptyStar);
        } else if(recipeRating >= 3.3 && recipeRating < 3.8) {
            // three and a half stars
            setStarOneImage(Star);
            setStarTwoImage(Star);
            setStarThreeImage(Star);
            setStarFourImage(HalfStar);
            setStarFiveImage(EmptyStar);
        } else if(recipeRating >= 3.8 && recipeRating < 4.3) {
            //four stars
            setStarOneImage(Star);
            setStarTwoImage(Star);
            setStarThreeImage(Star);
            setStarFourImage(Star);
            setStarFiveImage(EmptyStar);
        } else if(recipeRating >= 4.3 && recipeRating < 4.8) {
            //four and a half stars
            setStarOneImage(Star);
            setStarTwoImage(Star);
            setStarThreeImage(Star);
            setStarFourImage(Star);
            setStarFiveImage(EmptyStar);
        } else if(recipeRating >= 4.8 && recipeRating <= 5) {
            //five stars
            setStarOneImage(Star);
            setStarTwoImage(Star);
            setStarThreeImage(Star);
            setStarFourImage(Star);
            setStarFiveImage(Star);
        } else {
            // all empty stars
            setStarOneImage(EmptyStar);
            setStarTwoImage(EmptyStar);
            setStarThreeImage(EmptyStar);
            setStarFourImage(EmptyStar);
            setStarFiveImage(EmptyStar);
        }
    }, [mouseLeave, recipeRating]) 

    const onMouseHover = (starNumber) => {
        console.log(`star number is ${starNumber}`)
    }


  return (
    <div 
        id='star-rating-component'
        onMouseLeave={() => setMouseLeave(!mouseLeave)}>
        <img 
            src={starOneImage}
            className='star-image'
            onMouseEnter={() => onMouseHover(1)}/>
        <img 
            src={starTwoImage}
            className='star-image'
            onMouseEnter={() => onMouseHover(2)}/>
        <img
            src={starThreeImage}
            className='star-image'
            onMouseEnter={() => onMouseHover(3)}/>
        <img
            src={starFourImage}
            className='star-image'
            onMouseEnter={() => onMouseHover(4)}/>
        <img
            src={starFiveImage}
            className='star-image'
            onMouseEnter={() => onMouseHover(5)}/>
    </div>
  )
}

export default StarRating;