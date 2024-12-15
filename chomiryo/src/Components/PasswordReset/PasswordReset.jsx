import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './PasswordReset.css';

function PasswordReset() {

    const [ email, setEmail ] = useState('');
    const [ isEmailSent, setIsEmailSent ] = useState(false);
    const [ linkFromEmail, setLinkFromEmail ] = useState(false);
    const [ newPassword, setNewPassword ] = useState('');
    const [ verifyNewPassword, setVerifyNewPassword ] = useState('');
    const [ passwordsDoNotMatch, setPasswordDoNotMatch ] = useState(false);
    const [ isPasswordUpdated, setIsPasswordUpdated ] = useState(false);

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
            console.log('this is hit')
            // const { token } = useParams();
            const body = { token: token, newPassword: newPassword }
            const url = `http://127.0.0.1:4000/auth/updatePassword`
            const options = {
                method: "PUT",
                body: JSON.stringify(body),
                headers: new Headers({
                    "Content-Type" : "application/json"
                })
            }
            fetch(url, options)
                .then(res => res.json())
                .then(setIsPasswordUpdated(true))
                .catch(err => console.log("Error: ", err))

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
        { isPasswordUpdated 
            ? (
                <div>
                    <p className='password-updated-text'>Password Updated</p>
                    <p className='password-updated-text'>You may close this window.</p>
                </div>
            ): null }
    </div>
  )
}

export default PasswordReset