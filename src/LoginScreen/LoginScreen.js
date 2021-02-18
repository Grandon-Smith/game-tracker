import React from 'react';
import './LoginScreen.css';
import Nav from '../Nav/Nav';
import LoginForm from '../LoginForm/LoginForm'
import Utils from '../utils'


export default class LoginScreen extends React.Component {
    login = (e, email, pass) => {
        e.preventDefault()
        fetch('http://localhost:8000/login'
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
            console.log("RE-DIRECTING")
            sessionStorage.setItem('user', 'true')
            this.props.history.push(`/dashboard/${res.user.email}`)
        })
        .catch(err => console.log(err))
    }


    render() {
        console.log(this.props)
        return (
            <div>
                <Nav 
                    title={'/'}
                    routerUrl={'/'}
                    click={''}
                    hidden={'hide-nav'}
                />
                <LoginForm login={this.login}/>
            </div>
        )
    }
}