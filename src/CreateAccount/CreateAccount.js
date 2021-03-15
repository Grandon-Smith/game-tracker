import React from 'react';
import './CreateAccount.css';
import Nav from '../Nav/Nav';
import Utils from '../utils';
import { Link } from 'react-router-dom';

export default class CreateAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            createUsername: "",
            createEmail: "",
            createPassword: "",
        }
    }

    createAcct = (e, username, email, pass) => {
        e.preventDefault()
        fetch(`${Utils.api.nodeUrl}/create-account`
        , {
            method: 'POST',
            headers: new Headers({
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                'username': username,
                "email": email,
                "password": pass,
            })
        })
        .then(res => {
            if(!res.ok || res.status === 500) {
                console.log('ERROR', res.json())
            } else if (res.status === 201) {
                console.log('GOOD', res.json())
                this.props.history.push('/login')
            } else if (res.status === 200) {
                console.log('BAD', res.json())
            }
        })
        .catch()
    }

    render(){
        return (
            <div>
                <Nav 
                    title={'/'}
                />
                <div  className="login-container">
                    <form onSubmit={e => this.createAcct(e, this.state.createUsername, this.state.createEmail, this.state.createPassword)}>
                        <fieldset className="login-form">
                            <legend>Create Account</legend>
                            <div className="form-section">
                                <label 
                                    htmlFor="username" 
                                    name="username"
                                    className="visually-hidden">
                                        Username
                                </label>
                                <input
                                    id="username" 
                                    type="text"
                                    placeholder=" Username"
                                    onChange={e => this.setState({createUsername: e.target.value})}
                                />
                            </div>
                            <div className="form-section">
                                <label 
                                    htmlFor="email" 
                                    name="email"
                                    className="visually-hidden">
                                        Email
                                </label>
                                <input
                                    id="email" 
                                    type="text"
                                    placeholder=" Email"
                                    onChange={e => this.setState({createEmail: e.target.value})}
                                />
                            </div>
                            <div className="form-section">
                                <label 
                                    htmlFor="password" 
                                    name="password"
                                    className="visually-hidden">
                                        Password
                                </label>
                                <input 
                                    id="password" 
                                    type="password" 
                                    name="password"
                                    placeholder=" Password"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
                                    required
                                    onChange={e => this.setState({createPassword: e.target.value})}
                                />
                            </div>
                            <div className="login-form-buttons form-section">
                                <button type="submit">Submit</button>
                                <p> Already have an account?</p>
                            <Link to={"/login"}>
                                    Log In
                            </Link>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}