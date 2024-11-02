import React, { useEffect, useState } from 'react';
import Auth from './Components/Auth';
import FrontPage from './Components/FrontPage/FrontPage';
import './App.css'

function App() {

  const [ sessionToken, setSessionToken ] = useState(undefined);

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
          sessionToken={sessionToken}
          logout={logout} />
  }

  const logout = () => {
    localStorage.clear();
    setSessionToken(undefined);
  }

  return (
    <>
      {/* { sessionToken && <button id='logout' onClick={logout}>Logout</button>}  */}
      {handleLoggedIn()}
    </>
  )
}

export default App;