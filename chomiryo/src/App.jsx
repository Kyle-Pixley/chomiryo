import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Auth from './Components/Auth';
import FrontPage from './Components/FrontPage/FrontPage';
import Recipe from './Components/FrontPage/RecipesList/Recipe/Recipe';
import './App.css';

function App() {

  const [ sessionToken, setSessionToken ] = useState(undefined);
  const [ postRecipe, setPostRecipe ] = useState(false);
  const [ lookingAtRecipe, setLookingAtRecipe ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  }, [])

  const updateLocalStorage = newToken => {
    localStorage.setItem("token", newToken)
    setSessionToken(newToken)
  };

  const handleLoggedIn = () => {
    return !sessionToken
      ? <Auth 
          updateLocalStorage={updateLocalStorage} />
      : <FrontPage 
          postRecipe={postRecipe}
          setPostRecipe={setPostRecipe}
          lookingAtRecipe={lookingAtRecipe}
          setLookingAtRecipe={setLookingAtRecipe}
          sessionToken={sessionToken}
          logout={logout} />
  }

  // clears local storage to log out the user
  const logout = () => {
    localStorage.clear();
    setSessionToken(undefined);
  }

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={handleLoggedIn()} />
        <Route 
          path="/recipe" 
          element={<Recipe />} />
      </Routes>
    </>
  )
}

export default App;