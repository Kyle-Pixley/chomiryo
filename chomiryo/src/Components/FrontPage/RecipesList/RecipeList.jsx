import React, { useEffect, useState } from 'react';
import StarRating from '../StarRating/StarRating';
import { useNavigate } from 'react-router-dom';
import SearchPosts from '../SearchPosts/SearchPosts';
import './RecipeList.css';

function RecipeList({ viewingRecipePage }) {

  const [ allRecipes, setAllRecipes ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState('');
  const navigate = useNavigate();

  // returns recipes or searched recipes based on if anything is in the search input and the search button is clicked from SearchPosts.jsx (searchQuery)
  useEffect(() => {
    if(searchQuery != '') {
      const url = `/post/search?searchQuery=${encodeURIComponent(searchQuery)}`;
      const options = {
        method: "get",
        headers: new Headers({
          "Content-Type" : "application/json",
          "authorization" : localStorage.getItem("token")
        })
      }
      fetch(url,options)
        .then(res => res.json())
        .then( data => {
          setAllRecipes(data)
        })
        .catch(err => err.message)
    } else {
      const url = "/post/"
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
    }
  }, [searchQuery])

  //navigates to the individual recipe page using the id of that specific recipe that is the argument
  const handleRecipeClick = (recipeId) => {
    navigate('/recipe', { state: { recipeId }});
  }

  return (
    <div id='recipe-list-component'>
      <SearchPosts 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery} />
        <div id='recipe-parent'>
            {Array.isArray(allRecipes) && allRecipes.length > 0 ? ( allRecipes.map((recipe, i) => (
              <div id='individual-recipe' key={recipe._id}>
                <div 
                  id='recipe-image-border'
                  onClick={() => handleRecipeClick(recipe._id)}>
                    <img 
                      id='recipe-image'
                      src={recipe.recipePhoto}
                      alt={`${recipe.title} photo missing`} 
                      width='300'
                      height='300' />
                  </div>
                <h3 
                  id='recipe-title'
                  key={recipe._id}>
                    {recipe.title}
                </h3>
                <span id='recipe-rating'>
                  <StarRating 
                    recipeRating={recipe.averageRating}
                    recipeId={recipe._id}
                    viewingRecipePage={viewingRecipePage}/> 
                </span>
              </div>
            ))
                ) : (<p>No Recipes Found</p>)
            }
        </div>
    </div>
  )
}

export default RecipeList;