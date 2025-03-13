import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import './PostRecipe.css';

function PostRecipe({ setPostCreated }) {

    const [recipePhoto, setRecipePhoto ] = useState('');
    const [ recipeTitle, setRecipeTitle ] = useState('');
    const [ ingredients, setIngredients ] = useState(['1 cup of milk']);
    const [ recipeSteps, setRecipeSteps ] = useState(['Preheat oven to 350 degrees fahrenheit']);
    const [ instructions, setInstructions ] = useState({ingredients:[ingredients],recipeSteps:[recipeSteps]});
    const textareaRef = useRef(null);

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
    }, [ingredients, recipeSteps]);

    //adjusts height of the text area based on how much the user has typed
    const handleTextareaInput = e => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`
    }
    
    const handlePostSubmit = async e => {
        e.preventDefault();

        const url = "http://127.0.0.1:4000/post/create"
        const s3Url = "http://127.0.0.1:4000/utilities/s3-url";

        let recipePhotoUrl = "";

        if (recipePhoto) {
            const uploadUrl = await fetch(s3Url).then(res => res.json());

            await fetch(uploadUrl, {
                method: "PUT",
                headers: {
                    "Content-type" : "image/png"
                },
                body: recipePhoto
            }).then(res => console.log(res));
            console.log(uploadUrl)
            const imgUrl = uploadUrl.split("?")[0];
            recipePhotoUrl = imgUrl;
        };

        const body = { 
            recipePhoto: recipePhotoUrl,
            title: recipeTitle, 
            instructions: instructions 
        };

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: new Headers({
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            })
        })
        .then(res => res.json())
        .then(setPostCreated(true))
        .catch(err => console.error("Error: ", err))
    }

  return (
    <div id='post-recipe-component'>
        
        <form id='post-recipe-form'>
            <label 
                className='post-recipe-labels'
                >Recipe Name
            </label>
            <input  
                className='post-recipe-inputs'
                type='text'
                value={recipeTitle}
                maxLength="35"
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
                    className='add-delete-step-buttons'
                    onClick={addIngredient}>
                        Add Ingredient
                </button>
                <button
                    id='delete-ingredients-input-button'
                    className='add-delete-step-buttons'
                    onClick={deleteLastIngredient}>
                        Delete Last Ingredient
                </button>
            </div>
            <label 
                className='post-recipe-labels' >
                    Steps
            </label>
            { recipeSteps.map((steps, i) => (
                <textarea
                    rows={2}
                    ref={textareaRef}
                    onInput={handleTextareaInput}
                    key={i}
                    className='post-recipe-inputs'
                    type='text'
                    value={steps}
                    onChange={e => handleRecipeStepChange(i,e)}
                    placeholder={`Step #${i+1}`}>
                </textarea>
            ))}
            <div id='add-delete-steps-parent'>
                <button
                    id='add-steps-input-button'
                    className='add-delete-step-buttons'
                    onClick={addSteps}>
                        Add Step
                </button>
                <button
                    id='delete-step-input-button'
                    className='add-delete-step-buttons'
                    onClick={deleteLastStep}>
                        Delete Last Step
                </button>
            </div>
            <label className='post-recipe-labels'>
                Upload Photo
            </label>
            { recipePhoto === ''
            ? <input
                type='file'
                name='my-file'
                id='file-upload'
                accept='.jpeg, .jpg, .png, webp'
                onChange={e => {
                    setRecipePhoto(e.target.files[0])
                    console.log(e)}}/>
            : <div id='recipe-photo-preupload-button-parent'>
                <img 
                    src={URL.createObjectURL(recipePhoto)}
                    id='recipe-photo-preupload' /> 
                <button 
                    id='delete-preupload-photo-button'
                    onClick={() => setRecipePhoto('')}>
                    Delete Photo
                </button>
            </div> }
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