import React from 'react';
import './CreateAccount.css';
import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom'

export default function CreateAccount() {
    return (
        <div className="login-container">
            <Nav title={'/'}/>
            <form>
                <fieldset className="login-form">
                    <legend>Create Account:</legend>
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
                </fieldset>
            </form>
        </div>
    )
}