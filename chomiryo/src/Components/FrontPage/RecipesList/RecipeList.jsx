import React, { useEffect, useState } from 'react';
import StarRating from '../StarRating/StarRating';
import { useNavigate } from 'react-router-dom';
import SearchPosts from '../SearchPosts/SearchPosts';
import './RecipeList.css';

function RecipeList({ viewingRecipePage }) {

  const [ allRecipes, setAllRecipes ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ counter, setCounter ] = useState(0)
  const navigate = useNavigate();

  // returns recipes or searched recipes based on if anything is in the search input and the search button is clicked from SearchPosts.jsx (searchQuery)
  useEffect(() => {
    if(searchQuery != '') {
      // todo change this to the search endpoint
      const url = `http://127.0.0.1:4000/post/search?searchQuery=${encodeURIComponent(searchQuery)}`;
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
          console.log("Fetched Data", data)
          setAllRecipes(data)
        })
        .catch(err => err.message)
    } else {
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
    }
  }, [searchQuery])

  //navigates to the individual recipe page using the id of that specific recipe that is the argument
  const handleRecipeClick = (recipeId) => {
    navigate('/recipe', { state: { recipeId }});
  }

  useEffect(() => {
    allRecipes.forEach((recipe) => console.log(recipe.recipePhoto, 'here'))
  }, [])

  return (
    <div id='recipe-list-component'>
      <SearchPosts 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery} />
        <div id='recipe-parent'>
            {Array.isArray(allRecipes) && allRecipes.length > 0 ? ( allRecipes.map((recipe, i) => (
              <div id='individual-recipe' key={recipe._id}>
                <div 
                  id='recipe-image'
                  onClick={() => handleRecipeClick(recipe._id)}>
                    <img 
                      src={recipe.recipePhoto}
                      alt={`Photo of ${recipe.title}`} 
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