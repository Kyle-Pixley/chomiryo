import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './PasswordReset.css';

function PasswordReset() {

    const [ email, setEmail ] = useState('');
    const [ isEmailSent, setIsEmailSent ] = useState(false);
    const [ linkFromEmail, setLinkFromEmail ] = useState(false);
    const [ newPassword, setNewPassword ] = useState('');
    const [ verifyNewPassword, setVerifyNewPassword ] = useState('');
    const [ passwordsDoNotMatch, setPasswordDoNotMatch ] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const handleResetPasswordButton = e => {
        e.preventDefault();
    const url = `http://127.0.0.1:4000/email/forgot-password`;
    const options = {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: new Headers({
            "Content-Type" : "application/json"
        })
    }
    fetch(url, options)
        .then(res => res.json())
        .then(data => console.log(data.message))
        .then(setIsEmailSent(true))
        .catch(err => console.log(err))
    };

    //checks to see if token (for account password reset) exists
    useEffect(() => {
        if(token) {
            setLinkFromEmail(true);
        } else setLinkFromEmail(false);
    }, [])

    const handleNewPasswordSubmit = e => {
        e.preventDefault();
        setPasswordDoNotMatch(false);
        if(newPassword === verifyNewPassword) {
            //todo handle fetch to update password and a timeout (to convey to the user that the update was a success) + redirect to home page??? or make the title a link to the home page??? not sure yet
        } else {
            setPasswordDoNotMatch(true);
        }
    };

    const displayLinkNotSent = () => {
        return (
            <form id='reset-password-form'>
            <input
                id='reset-password-input'
                className='input'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value.trim())}
                placeholder='Enter Email' />
            <button
                onClick={e => handleResetPasswordButton(e)}>
                Reset Password
            </button>
        </form>
        )
    };

    const displayLinkSent = () => {
        return (
            <form id='new-password-form'>
                <input
                    className='input'
                    type='password'
                    placeholder='New Password'
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}>
                </input>
                <input
                    className='input'
                    type='password'
                    placeholder='Verify New Password'
                    value={verifyNewPassword}
                    onChange={e => setVerifyNewPassword(e.target.value)}>
                </input>
                <button
                    type='submit'
                    onClick={e => handleNewPasswordSubmit(e)}>
                    Submit
                </button>
            </form>
        )
    };

  return (
    <div id='reset-password-component'>
        { linkFromEmail 
            ? displayLinkSent()
            : displayLinkNotSent()}
        { passwordsDoNotMatch 
            ? (
                <p id='passwords-do-not-match-text'>Passwords do not match</p>
            )
            : null }
    </div>
  )
}

export default PasswordReset