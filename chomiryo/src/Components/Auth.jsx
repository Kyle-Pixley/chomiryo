import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import PasswordReset from './PasswordReset/PasswordReset';
import './Auth.css';

function Auth({ updateLocalStorage }) {

    const [ email, setEmail ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isError, setIsError ] = useState(false);
    const [ login, setLogin ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState('');
    const navigate = useNavigate();

    const toggle = e => {
        e.preventDefault();
        setLogin(!login);
        setErrorMessage("");
        setEmail("");
        setUserName("");
        setPassword("");
    };

    const register = () => login ? null : (
        <>
            <input
                type='email'
                id='email-input'
                className='input'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Enter Email'
            />
        </>
    )

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = login 
            ? "http://10.0.0.23:4000/auth/login"
            : "http://10.0.0.23:4000/auth/register";
        
        const body = login 
            ? { userName, password }
            : { email, userName, password };

        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: new Headers({
                    "Content-Type" : "application/json"
                })
            });

            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Invalid Login Credentials");
            }

            const data = await response.json();
            updateLocalStorage(data.token);
            setErrorMessage("");
            setIsError(false);
        } catch (err) {
            setIsError(true);
            setErrorMessage(err.message);
        }
    };

    const errorMessageSimple = () => {
        if (errorMessage.slice(0,6) === 'E11000') {
            return 'Please use a valid E-mail'
        } else return (
            <div id='error-message-parent'>
                <p>{errorMessage}</p>
                <button
                    id='forgot-password-button'
                    onClick={() => handleForgotPassword()}>
                    Forgot Password?
                </button>
            </div>
        )
    };

    const handleForgotPassword = () => {
        navigate('/resetPassword');
    };

    const displayAuthPage = () => {
        return (
            <div id='auth-form-container'>
            <button 
                id='signup-button'
                onClick={toggle}
                >{ login ? "TO SIGNUP" : "TO LOGIN" }</button>

            <form action='' id='form-parent'>
                {register()}
                <input
                    type='text'
                    autoCapitalize='none'
                    autoCorrect='off'
                    spellCheck='false'
                    id='user-name-input'
                    className='input'
                    value={userName}
                    onChange={e => setUserName(e.target.value.trim())}
                    placeholder='Enter Username'
                    />
                <input
                    type='password'
                    id='password-input'
                    className='input'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Enter Password'
                    />
                <button 
                    id='auth-submit-button'
                    type='submit'
                    onClick={handleSubmit}
                    >{ login ? "SIGN IN" : "REGISTER" }</button>
            </form>
            { isError 
                ? errorMessageSimple()
                : null }
        </div>
        )
    }

  return (
    <div id='auth-component'> 

            <h1 id='auth-title'>CHOMIRYO
                
            </h1>
        
        <Routes>
            <Route
                path='/'
                element={displayAuthPage()} />
            <Route
                path='/resetPassword'
                element={<PasswordReset />} />
        </Routes>

        
    </div>
  )
}

export default Auth;