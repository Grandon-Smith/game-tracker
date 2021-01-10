import React from 'react';
import './LoginScreen.css';
import Nav from '../Nav/Nav';
import LoginForm from '../LoginForm/LoginForm'


export default function Welcome() {
    return (
        <div>
            <Nav/>
            <LoginForm/>
        </div>
    )
}