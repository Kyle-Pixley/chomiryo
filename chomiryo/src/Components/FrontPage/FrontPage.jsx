import React, { useState, useEffect } from 'react';
import RecipeList from './RecipesList/RecipeList';
import PostRecipe from './PostRecipe/PostRecipe';
import PostCreated from './PostCreated/PostCreated';
import './FrontPage.css';

function FrontPage({ logout, postRecipe, setPostRecipe }) {

    const [ postCreated, setPostCreated ] = useState(false);

    useEffect(() => {
        if(postCreated) {
            setTimeout(() => {
                setPostRecipe(false);
                setPostCreated(false);
            }, 5000)
        }
    }, [ postCreated])

    const displayFrontPage = () => {
        if(postCreated) {
            return <PostCreated />
        } else if(postRecipe) {
            return <PostRecipe 
                        setPostCreated={setPostCreated}/>
        } else return <RecipeList />
    }

    
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
        {displayFrontPage()}
    </div>
  )
}

export default FrontPage;