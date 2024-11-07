import React, { useEffect, useState } from 'react';
import './RecipeList.css';

function RecipeList() {

  const [ allRecipes, setAllRecipes ] = useState([]);

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

    
  return (
    <div id='recipe-list-component'>
        { allRecipes.map((recipe, i) => (
          <h3 key={recipe._id}>{recipe.title}</h3>
        ))}
    </div>
  )
}

export default RecipeList;