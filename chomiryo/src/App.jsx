import React, { useEffect, useState } from 'react';
import Auth from './Components/Auth';
import FrontPage from './Components/FrontPage/FrontPage';
import './App.css';

function App() {

  const [ sessionToken, setSessionToken ] = useState(undefined);
  const [ postRecipe, setPostRecipe ] = useState(false);
  const [ lookingAtRecipe, setLookingAtRecipe ] = useState(false);


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
      {handleLoggedIn()}
    </>
  )
}

export default App;