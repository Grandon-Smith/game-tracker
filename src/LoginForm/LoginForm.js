import React from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loginUsername: "",
            loginPassword: "",
        }
    };

    render(){
        return (
            <div className="login-container">
                <form onSubmit={e => this.props.login(e, this.state.loginUsername, this.state.loginPassword)}>
                    <fieldset className="login-form">
                        <legend>Login:</legend>
                        <label htmlFor="username">Username: </label>
                        <input 
                            id="username" 
                            type="text"
                            onChange={e => this.setState({loginUsername: e.target.value})}
                        />
                        <label htmlFor="password">Password: </label>
                        <input 
                            id="password" 
                            type="password" 
                            name="password" 
                            onChange={e => this.setState({loginPassword: e.target.value})}
                            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
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
        );
    };
};