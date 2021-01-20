import React from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom'

export default function LoginForm() {
    return (
        <div className="login-container">
            <form>
                <fieldset className="login-form">
                    <legend>Login:</legend>
                    <label htmlFor="username" name="username">Username: </label>
                    <input id="username" type="text"/>
                    <label htmlFor="password" name="password">Password: </label>
                    <input 
                        id="password" 
                        type="password" 
                        name="password" 
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
                        required
                    />
                    <Link to={"/create-account"}>
                        <button type="button">Create Account</button>
                    </Link>
                    <button type="submit">Log in</button>
                </fieldset>
            </form>
        </div>
    )
}