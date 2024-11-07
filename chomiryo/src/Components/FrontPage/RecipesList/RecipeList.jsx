import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeList.css';

function RecipeList({ lookingAtRecipe, setLookingAtRecipe}) {

  const navigate = useNavigate();

  const [ allRecipes, setAllRecipes ] = useState([]);

  //navigates to the individual recipe page using the recipe id that is passed through 
  const handleRecipeClick = (recipeId) => {
    navigate('/recipe', { state: { recipeId } });
  }

  useEffect(() => {
    const url = "http://127.0.0.1:4000/post/"
    const options = {
      method: "GET",
      headers: new Headers({
        "Content-Type" : "application/json",
        "authorization" : localStorage.getItem("token")
      })
    }
    fetch(url, options)
      .then(res => res.json())
      .then(data => setAllRecipes(data))
      .catch(err => err.message)
  }, [])

    useEffect(() => {
      console.log(allRecipes)
    }, [allRecipes])

    const handleRecipeRatingDisplay = (rating) => {
      if(rating >= 0 && rating <= 1) {
        return 'Bad'
      }
    }


  return (
    <div id='recipe-list-component'>
        {/* { allRecipes.map((recipe, i) => (
          <h3 key={recipe._id}>{recipe.title}</h3>
        ))} */}
        <div id='recipe-parent'>
            {allRecipes.map((recipe, i) => (
              <div id='individual-recipe'>
                <div 
                  id='recipe-image'
                  onClick={() => handleRecipeClick(recipe._id)}></div>
                <h3 
                  id='recipe-title'
                  key={recipe._id}>
                    {recipe.title}
                </h3>
                <span id='recipe-rating'>{handleRecipeRatingDisplay(recipe.rating)}</span>
              </div>
            ))}
        </div>
    </div>
  )
}

export default RecipeList;