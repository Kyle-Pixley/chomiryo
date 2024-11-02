import React from 'react';

import './FrontPage.css';

function FrontPage({ logout }) {
  return (
    <div id='front-page-component'>
        <div id='top-banner'>might change this depending on the "weight" of the pictures users submit</div>
        <div id='top-banner-bottom-border'>
            <p 
                id='create-recipe-button'
                onClick={console.log('create-post/recipe')} >Post Recipe</p>
            <p 
                id='logout-button'
                onClick={logout}>Logout</p>
        </div>
        FrontPage
        
    </div>
  )
}

export default FrontPage;