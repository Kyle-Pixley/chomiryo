import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import StarRating from '../../StarRating/StarRating';
import RecipeComments from './RecipeComments/RecipeComments';
import walnut from '../../../../assets/walnut.png';
import './Recipe.css';

function Recipe({ viewingRecipePage }) {
    const location = useLocation();
    const recipeId = location.state?.recipeId;
    const [ singleRecipe, setSingleRecipe ] = useState({});
    const [ ingredientsList, setIngredientsList ] = useState([]);
    const [ uploadedBy, setUploadedBy ] = useState('');
    const [ stepsList, setStepsList ] = useState([]);

    const [ updateRecipe, setUpdateRecipe ] = useState(false);

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
        if(singleRecipe.user) {
            const url = `http://127.0.0.1:4000/auth/${singleRecipe.user}`
            const options = {
                headers: new Headers({
                    "Content-Type" : "application/json",
                    "authorization" : localStorage.getItem("token")
                })
            }
            fetch(url,options)
                .then(res => res.json())
                .then(data => setUploadedBy(data))
                .catch(err => err.message)
        }
    }, [singleRecipe])

    useEffect(() => {
        if(singleRecipe && singleRecipe.instructions) {
            setIngredientsList(singleRecipe.instructions.ingredients)
            setStepsList(singleRecipe.instructions.steps)
        }
    }, [singleRecipe]);

    useEffect(() => {
        if(uploadedBy && uploadedBy.foundUser) {
            console.log(uploadedBy.foundUser, 'this here')
            //todo if uploadedBy.foundUser._id === currentLoggedInUser._id
            if(uploadedBy.foundUser._id ) {

            }
        }
    }, [uploadedBy])

  return (
    <div id='single-recipe-component'>
        <div id='single-recipe-title-and-image'>
            <img 
                id='single-recipe-image'
                src={walnut} />

            <div style={{
                    width: "100%", 
                    height: "100%", 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"}}>
                <h2 id='single-recipe-title'>
                    {singleRecipe.title ? singleRecipe.title.toUpperCase() : 'loading...'}
                </h2>
                <StarRating 
                    recipeRating={singleRecipe.averageRating}
                    viewingRecipePage={viewingRecipePage} 
                    recipeId={recipeId} />
                <h4>Uploaded by: {uploadedBy.foundUser ? uploadedBy.foundUser.userName : 'Unknown'}</h4>
            </div>

        </div>
        <div id='ingredients-steps-parent'>
            <div id='ingredients'>
                <h3>Ingredients</h3>
                {/* //todo this font sucks */}
                <ul>

                    {ingredientsList 
                        ? ingredientsList.map((item, i) =>(
                            <li
                                key={i}>
                                {item}
                            </li>
                        )) 
                        : "Loading..."}
                </ul>
            </div>
            <div id='steps'>
                <h3>Steps</h3>
                <ol>
                {stepsList
                    ? stepsList.map((item,i) => (
                            <li
                                key={i}>
                                {item}
                            </li>
                        ))
                        : "Loading..."}
                </ol>
            </div>
        </div>
        <div 
            id="recipe-bottom-border">
        </div>
        <RecipeComments 
            recipeId={recipeId}/>
    </div>
  )
}

export default Recipe;