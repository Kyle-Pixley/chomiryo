import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Auth from './Components/Auth';
import FrontPage from './Components/FrontPage/FrontPage';
import './App.css';

function App() {

  const [ sessionToken, setSessionToken ] = useState(undefined);
  const [ postRecipe, setPostRecipe ] = useState(false);
  const [ viewingRecipePage, setViewingRecipePage ] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  }, [])

  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
  
      if( !token ) {
        navigate('/');
        logout();
    }
      const { exp } = jwtDecode(token.trim());
      
      
      const currentTime = Date.now() / 1000;

      if(exp < currentTime) {
        navigate('/')
        logout() 
      }

    } catch (err) {
      navigate('/');
      logout();
    };
}, [ postRecipe, viewingRecipePage ]);

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
          viewingRecipePage={viewingRecipePage}
          setViewingRecipePage={setViewingRecipePage}
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