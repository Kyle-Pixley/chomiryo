import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import walnut from '../../../../assets/walnut.png';
import './Recipe.css';

function Recipe() {
    const location = useLocation();
    const recipeId = location.state?.recipeId;
    const [ singleRecipe, setSingleRecipe ] = useState({});
    const [ ingredientsList, setIngredientsList ] = useState([]);
    const [ stepsList, setStepsList ] = useState([]);

    //fetches the single post based on the recipe._id aka recipeId
    useEffect(() => {
        const url = `http://127.0.0.1:4000/post/${recipeId}`
        const options = {
            headers: new Headers({
                "Content-Type" : "application/json",
                "authorization" : localStorage.getItem("token")
            })
        }
        fetch(url, options)
            .then(res => res.json())
            .then(data => setSingleRecipe(data))
            .catch(err => err.message)
    }, []);

    useEffect(() => {
        if(singleRecipe && singleRecipe.instructions) {
            setIngredientsList(singleRecipe.instructions.ingredients)
            setStepsList(singleRecipe.instructions.steps)
        }
    }, [singleRecipe])


  return (
    <div id='single-recipe-component'>
        <div id='single-recipe-title-and-image'>
            <img 
                id='single-recipe-image'
                src={walnut} />
            <div style={{width: "100%", height: "100%"}}>
                <h2 id='single-recipe-title'>
                    {singleRecipe.title ? singleRecipe.title.toUpperCase() : 'loading...'}
                </h2>
            </div>

        </div>
        <div id='ingredients-steps-parent'>
            <div id='ingredients'>
                <h3>Ingredients</h3>
                {/* //todo this font sucks */}
                <ul>

                    {ingredientsList 
                        ? ingredientsList.map(item =>(
                            <li>{item}</li>
                        )) 
                        : "Loading..."}
                </ul>
            </div>
            <div id='steps'>
                <h3>Steps</h3>
                <ol>
                {stepsList
                    ? stepsList.map((item,i) => (
                            <li>
                                {item}
                            </li>
                        ))
                        : "Loading..."}
                </ol>
            </div>
        </div>
    </div>
  )
}

export default Recipe;