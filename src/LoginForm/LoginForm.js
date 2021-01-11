import React from 'react';
import './LoginForm.css'

export default function LoginForm() {
    return (
        <div>
            <form>
                <fieldset>
                    <legend>Login:</legend>
                    <label htmlFor="username" name="username">Username: </label>
                    <input id="username" type="text"/>
                    <label htmlFor="password" name="password">Password: </label>
                    <input id="password" type="password"/>
                    <input type="submit"/>
                </fieldset>
            </form>
        </div>
    )
}