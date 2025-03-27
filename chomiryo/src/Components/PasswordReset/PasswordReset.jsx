import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    //handles sending the user a email to there email in the user model that has a link to update there password
    //! some reason this stopped working. It Works on the back end though
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

    //handle updating the password to the user model in the database
    const handleNewPasswordSubmit = e => {
        e.preventDefault();
        setPasswordDoNotMatch(false);
        if(newPassword === verifyNewPassword) {
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
                
        } else {
            setPasswordDoNotMatch(true);
        }
    };

    //displays the form for the user to confirm their email before the email link is sent
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

    //displays the form for the user to choose a new password
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

    // redirects to login page 5 seconds after the password has been updated
    useEffect(() => {
        if(isPasswordUpdated) {
            setTimeout(() => {
                navigate('/');
            }, '5000')
        }
    }, [isPasswordUpdated])

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
                    <p className='password-updated-text'>You will be redirected to the login page.</p>
                </div>
            ): null }
    </div>
  )
}

export default PasswordReset;