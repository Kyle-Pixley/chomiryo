import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './PostRecipe.css';

function PostRecipe({ setPostCreated }) {

    const [ recipeTitle, setRecipeTitle ] = useState('');
    const [ ingredients, setIngredients ] = useState(['1 cup of milk']);
    const [ recipeSteps, setRecipeSteps ] = useState(['Preheat oven to 350 degrees fahrenheit']);
    const [ instructions, setInstructions ] = useState({ingredients:[ingredients],recipeSteps:[recipeSteps]});

    const addIngredient = e => {
        e.preventDefault(); 
        setIngredients([...ingredients, '']);
        console.log(ingredients);
    }
    const addSteps = e => {
        e.preventDefault();
        setRecipeSteps([...recipeSteps, '']);
        console.log(recipeSteps);
    }
    const deleteLastIngredient = e => {
        e.preventDefault();
        setIngredients(prevIngredients => prevIngredients.slice(0, -1));
    }
    const deleteLastStep = e => {
        e.preventDefault();
        setRecipeSteps(prevRecipeSteps => prevRecipeSteps.slice(0,-1));
    }
    const handleIngredientChange = (i,e) => {
        const newIngredients = [...ingredients];
        newIngredients[i] = e.target.value;
        setIngredients(newIngredients);
    }
    const handleRecipeStepChange = (i,e) => {
        const newRecipeSteps = [...recipeSteps];
        newRecipeSteps[i] = e.target.value;
        setRecipeSteps(newRecipeSteps)
    }
    useEffect(() => {
        setInstructions({ingredients: ingredients, steps: recipeSteps})
    }, [ingredients, recipeSteps])
    
    const handlePostSubmit = e => {
        e.preventDefault();

        const url = "http://127.0.0.1:4000/post/create"

        const body = { title: recipeTitle, instructions: instructions };
        console.log('this is the body ', body);

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .then(setPostCreated(true))
        .catch(err => console.error("Error: ", err))
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
                onChange={e => setRecipeTitle(e.target.value)}>
            </input>
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
            <label 
                className='post-recipe-labels' >
                    Steps
            </label>
            { recipeSteps.map((steps, i) => (
                <input
                    key={i}
                    className='post-recipe-inputs'
                    type='text'
                    value={steps}
                    onChange={e => handleRecipeStepChange(i,e)}
                    placeholder={`Step #${i+1}`}>
                </input>
            ))}
            <div id='add-delete-steps-parent'>
                <button
                    id='add-steps-input-button'
                    onClick={addSteps}>
                        Add Step
                </button>
                <button
                    id='delete-step-input-button'
                    onClick={deleteLastStep}>
                        Delete Last Step
                </button>
            </div>
            <button
                type='submit'
                onClick={handlePostSubmit}>
                    Upload Recipe
            </button>
        </form>
    </div>
  )
}

export default PostRecipe;