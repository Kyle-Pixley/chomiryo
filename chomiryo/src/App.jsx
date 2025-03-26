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


  //if the user has a session token in there browsers storage than it sets it to sessionToken useState
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  }, [])

  //if there is no session token in the local storage then the app makes sure the user is logged out and on the correct page to be able to log in
  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
  
      if( !token ) {
        navigate('/');
        logout();
    }
      const { exp } = jwtDecode(token.trim());
      
      const currentTime = Date.now() / 1000;
      
      //if the session token is expired than logs the user out and navigates to home page for the user to be able to log back in
      if(exp < currentTime) {
        navigate('/')
        logout() 
      }

    } catch (err) {
      navigate('/');
      logout();
    };
}, [ postRecipe, viewingRecipePage ]);

  //updates locale storage with a new token
  const updateLocalStorage = newToken => {
    localStorage.setItem("token", newToken)
    setSessionToken(newToken)
  };

  //handle displaying the login page or the front page of the application 
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