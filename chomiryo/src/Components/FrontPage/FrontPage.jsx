import React from 'react';
import RecipeList from './RecipesList/RecipeList';
import PostRecipe from './PostRecipe/PostRecipe';
import './FrontPage.css';

function FrontPage({ logout, postRecipe, setPostRecipe }) {


    
  return (
    <div id='front-page-component'>
        <div id='top-banner'>might change this depending on the "weight" of the pictures users submit</div>
        <div id='top-banner-bottom-border'>
            <p 
                id='create-recipe-button'
                onClick={() => setPostRecipe(!postRecipe)}>{postRecipe ? 'Recipes' : 'Post Recipe'}</p>
            <p 
                id='logout-button'
                onClick={logout}>Logout</p>
        </div>
        FrontPage
        {postRecipe 
            ? <PostRecipe />
            : <RecipeList />}
    </div>
  )
}

export default FrontPage;