import React from 'react';
import { useLocation } from 'react-router-dom';
import './Recipe.css';

function Recipe() {
    const location = useLocation();
    const recipeId = location.state?.recipeId;


  return (
    <div>
        {recipeId}
    </div>
  )
}

export default Recipe