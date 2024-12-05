import React, { useEffect, useState } from 'react';
import StarRating from '../StarRating/StarRating';
import { useNavigate } from 'react-router-dom';
import SearchPosts from '../SearchPosts/SearchPosts';
import './RecipeList.css';

function RecipeList({ viewingRecipePage }) {

  const [ allRecipes, setAllRecipes ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('search query = ', searchQuery)
    if(searchQuery != '') {
      // todo change this to the search endpoint
      const url = "http://127.0.0.1:4000/post/search";
      const body = searchQuery;
      const options = {
        method: "GET",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type" : "application/json",
          "authorization" : localStorage.getItem("token")
        })
      }
      fetch(url,options)
        .then(console.log('its hitting here'))
        .then(data => console.log(data))
        .then(res => res.json())
        .then(data => setAllRecipes(data))
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

  useEffect(() => {
    console.log('this is all recipes', allRecipes)
  }, [allRecipes])

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
                <span id='recipe-rating'>{
                  <StarRating 
                    recipeRating={recipe.averageRating}
                    recipeId={recipe._id}
                    viewingRecipePage={viewingRecipePage}/>
                }</span>
              </div>
            ))}
        </div>
    </div>
  )
}

export default RecipeList;