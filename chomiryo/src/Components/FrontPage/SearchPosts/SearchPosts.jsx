import React, { useState } from 'react';
import './SearchPosts.css';

function SearchPosts({ searchQuery, setSearchQuery }) {

    const [ searchInput, setSearchInput ] = useState('');

    const handleSubmitSearchForm = e => {
        e.preventDefault();
        console.log('search button clicked')
        setSearchQuery(searchInput);
    }

  return (
    <div id='search-posts'>
        <form style={{display: 'flex'}}>
            <input
                id='search-input'
                type='text'
                placeholder='Search Ingredients'
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}>
            </input>
            <div id='button-container'>
            <button 
                id='search-button'
                type='submit'
                onClick={handleSubmitSearchForm}>
                    Search
                </button>
            </div>
        </form>
    </div>
  )
}

export default SearchPosts;