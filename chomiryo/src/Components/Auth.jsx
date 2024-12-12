import React, { useState } from 'react';
import './Auth.css';

function Auth({ updateLocalStorage }) {

    const [ email, setEmail ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ isError, setIsError ] = useState(false);
    const [ forgotPassword, setForgotPassword ] = useState(false);

    const [ login, setLogin ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState('');

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
            ? "http://127.0.0.1:4000/auth/login"
            : "http://127.0.0.1:4000/auth/register";
            console.log(url)
        
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
                console.log("this is the error data", errorData);
                throw new Error(errorData.message);
            }

            const data = await response.json();
            updateLocalStorage(data.token);
            setErrorMessage("");
        } catch (err) {
            setIsError(true);
            setErrorMessage(err.message);
            console.error(err.message);
        }
    };

    const sendPasswordResetEmail = e => {
        e.preventDefault();
        
    };

    const errorMessageSimple = () => {
        if (errorMessage.slice(0,6) === 'E11000') {
            return 'Please use a valid E-mail'
        } else return (
            <div id='error-message-parent'>
                <p>{errorMessage}</p>
                <button
                    id='forgot-password-button'
                    onClick={() => setForgotPassword(true)}>
                    Forgot Password?
                </button>
            </div>
        )
    };

    const displayForgotPasswordForm = () => {
        return (
            <form id='forgot-password-form'>
                <input 
                    className='input'
                    type='email'
                    placeholder='Enter E-Mail'>
                </input>
                <button
                    id='send-password-reset-email'
                    onClick={e => sendPasswordResetEmail(e)}>
                        Reset Password
                </button>
            </form>
        )
    }



  return (
    <div id='auth-component'> 
        <div id='auth-title-text'>
            <h1 id='auth-title'>CHOMIRYO</h1>
        </div>
        <div id='auth-form-container'>
            <button 
                id='signup-button'
                onClick={toggle}
                >{ login ? "TO SIGNUP" : "TO LOGIN" }</button>

            <form action='' id='form-parent'>
                {register()}
                <input
                    type='text'
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
            { forgotPassword 
                ? displayForgotPasswordForm() 
                : null }
        </div>
    </div>
  )
}

export default Auth;