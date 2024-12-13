import React, { useState } from 'react';
import './PasswordReset.css';

function PasswordReset() {

    const [ email, setEmail ] = useState('');
    const [ isEmailSent, setIsEmailSent ] = useState(false);

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

  return (
    <div id='reset-password-component'>
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
    </div>
  )
}

export default PasswordReset