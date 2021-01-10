import React from 'react';
import './Login-form.css'

export default function Login() {
    return (
        <div>
            <form>
                <fieldset>
                    <legend>Login:</legend>
                    <label for="username" name="username">Username:</label>
                    <input id="username" type="text"/>
                    <label for="password" name="password">Password:</label>
                    <input id="password" type="password"/>
                    <input type="submit"/>
                </fieldset>
            </form>
        </div>
    )
}