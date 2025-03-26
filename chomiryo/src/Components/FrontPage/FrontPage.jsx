import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import RecipeList from './RecipesList/RecipeList';
import PostRecipe from './PostRecipe/PostRecipe';
import PostCreated from './PostCreated/PostCreated';
import Recipe from './RecipesList/Recipe/Recipe';
import './FrontPage.css';

function FrontPage({ logout, postRecipe, setPostRecipe, viewingRecipePage, setViewingRecipePage }) {

    const [ postCreated, setPostCreated ] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    //tracks if the user is viewing Recipe.jsx
    useEffect(() => {
        setViewingRecipePage(location.pathname === '/recipe');
    }, [location])

    //displays a different component depending on what useStates are true
    const displayFrontPage = () => {
        if(postCreated) {
            return <PostCreated 
                        postCreated={postCreated}
                        setPostCreated={setPostCreated} 
                        setPostRecipe={setPostRecipe} />
        } else if(postRecipe) {
            return <PostRecipe 
                        setPostCreated={setPostCreated}/>
        } else return <RecipeList 
                        viewingRecipePage={viewingRecipePage}/>
    };

    //makes sure the url navigate back to '/' after a recipe is posted for home page
    const handlePostRecipeClick = () => {
        setPostRecipe(!postRecipe);
        navigate('/');
    };
    //handles triggering the logout() function and navigate back to '/' just in case user is not on the home page 
    const handleLogout = () => {
        logout();
        navigate('/');
    }
    //returns user to the page that is the list of the recipes that the user sees when they first login. (The main page)
    const handleBannerTitleClick = () => {
        navigate('/')
        if(postRecipe) {
            setPostRecipe(false);
        }
    }

    
  return (
    <div id='front-page-component'>
        <div id='top-banner-background'>
            <div id='top-banner'
                onClick={() => handleBannerTitleClick()}>CHOMIRYO</div>
                <div id='top-banner-post-logout-parent'>
                <p 
                    id='create-recipe-button'
                    onClick={handlePostRecipeClick}>{postRecipe ? 'Recipes' : 'Post Recipe'}</p>
                <p 
                    id='logout-button'
                    onClick={() => handleLogout()}>Logout</p>
                </div>
            </div>
        <Routes>
            <Route
                path='/'
                element={displayFrontPage()} />
            <Route
                path='/recipe'
                element={<Recipe 
                            viewingRecipePage={viewingRecipePage} />} />
        </Routes>
    </div>
  )
}

export default FrontPage;