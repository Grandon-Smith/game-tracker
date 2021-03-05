import React from 'react';
import './LoginScreen.css';
import Nav from '../Nav/Nav';
import LoginForm from '../LoginForm/LoginForm';
import Utils from '../utils';


export default class LoginScreen extends React.Component {
    login = (e, email, pass) => {
        e.preventDefault()
        fetch(`${Utils.api.nodeUrl}/login`
        , {
            method: 'POST',
            headers: new Headers({
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "email": email,
                "password": pass,
            })
        })
        .then(res => res.json())
        .then(res => {
            if(!res.user) {
                console.log("oh no")
                return
            }
            const { username, email } = res.user
            sessionStorage.setItem('user', email)
            sessionStorage.setItem('name', username)
            this.props.history.push(`/dashboard/${res.user.username}`)
        })
        .catch(err => console.log(err));
    };


    render() {
        if(sessionStorage.getItem('user')) {
            this.props.history.push(`/dashboard/${sessionStorage.name}`)
        }
        return (
            <div>
                <Nav 
                    title={'/'}
                />
                <LoginForm login={this.login}/>
            </div>
        );
    };
};