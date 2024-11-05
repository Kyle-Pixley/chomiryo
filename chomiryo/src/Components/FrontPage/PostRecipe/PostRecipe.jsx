import React, { useState } from 'react';
import './PostRecipe.css';

function PostRecipe() {

    const [ recipeTitle, setRecipeTitle ] = useState('');
    const [ ingredients, setIngredients ] = useState([]);
    const [ recipeSteps, setRecipeSteps ] = useState([]);
  return (
    <div id='post-recipe-component'>
        <p id='post-recipe-title'>Fill out the from to post your own recipe!</p>
        <form id='post-recipe-form'>
            <label 
                className='post-recipe-labels'
                >Recipe Name
            </label>
            <input  
                className='post-recipe-inputs'
                type='text'
                value={recipeTitle}
                onChange={e => setRecipeTitle(e.target.value.trim())}>
            </input>
            {/* //todo figure out how to set up ingredients so the user can have as many as there recipe calls for with exactly as many inputs as they need */}
        </form>
    </div>
  )
}

export default PostRecipe