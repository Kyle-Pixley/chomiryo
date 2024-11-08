import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import RecipeList from './RecipesList/RecipeList';
import PostRecipe from './PostRecipe/PostRecipe';
import PostCreated from './PostCreated/PostCreated';
import Recipe from './RecipesList/Recipe/Recipe';
import './FrontPage.css';

function FrontPage({ logout, postRecipe, setPostRecipe }) {

    const [ postCreated, setPostCreated ] = useState(false);
    const navigate = useNavigate();


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

    const handlePostRecipeClick = () => {
        setPostRecipe(!postRecipe);
        navigate('/');
    };
    const handleLogout = () => {
        logout();
        navigate('/');
    }

    
  return (
    <div id='front-page-component'>
        <div id='top-banner'>might change this depending on the "weight" of the pictures users submit</div>
        <div id='top-banner-bottom-border'>
            <p 
                id='create-recipe-button'
                onClick={handlePostRecipeClick}>{postRecipe ? 'Recipes' : 'Post Recipe'}</p>
            <p 
                id='logout-button'
                onClick={handleLogout}>Logout</p>
        </div>
        <Routes>
            <Route
                path='/'
                element={displayFrontPage()} />
            <Route
                path='/recipe'
                element={<Recipe />} />
        </Routes>
    </div>
  )
}

export default FrontPage;