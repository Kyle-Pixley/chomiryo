import React, { useState } from 'react';
import './PostRecipe.css';

function PostRecipe() {

    const [ recipeTitle, setRecipeTitle ] = useState('');
    const [ ingredients, setIngredients ] = useState(['1 cup of milk']);
    const [ recipeSteps, setRecipeSteps ] = useState([]);

    const addIngredient = e => {
        e.preventDefault()
        setIngredients([...ingredients, '']);
        console.log(ingredients)
    }
    const deleteLastIngredient = e => {
        e.preventDefault();
        setIngredients(prevIngredients => prevIngredients.slice(0, -1));
    }
    const handleIngredientChange = (i,e) => {
        const newIngredients = [...ingredients];
        newIngredients[i] = e.target.value;
        setIngredients(newIngredients);
    }

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
            <label
                className='post-recipe-labels'>
                    Ingredients
            </label>
            { ingredients.map((ingredient, i) => (
                    <input
                        key={i}
                        className='post-recipe-inputs'
                        type='text'
                        value={ingredient}
                        onChange={e => handleIngredientChange(i,e)}
                        placeholder={`Ingredient #${i+1}`}>
                    </input>
            ))}
            <div id='add-delete-ingredients-parent'>
                <button 
                    id='add-ingredients-input-button'
                    onClick={addIngredient}>
                        Add Ingredient
                </button>
                <button
                    id='delete-ingredients-input-button'
                    onClick={deleteLastIngredient}>
                        Delete Last Ingredient
                </button>
            </div>

        </form>
    </div>
  )
}

export default PostRecipe