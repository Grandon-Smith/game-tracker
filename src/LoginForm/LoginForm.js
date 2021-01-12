import React from 'react';
import './LoginForm.css'

export default function LoginForm() {
    return (
        <div className="login-container">
            <form>
                <fieldset className="login-form">
                    <legend>Login:</legend>
                    <label htmlFor="username" name="username">Username: </label>
                    <input id="username" type="text"/>
                    <label htmlFor="password" name="password">Password: </label>
                    <input id="password" type="password"/>
                    <button type="submit">Log in</button>
                </fieldset>
            </form>
        </div>
    )
}