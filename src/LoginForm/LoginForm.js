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
                        <legend>Login</legend>
                        <div className="form-section">
                            <label 
                                htmlFor="username" 
                                className="visually-hidden">
                                    Email
                            </label>
                            <input 
                                id="username" 
                                type="text"
                                onChange={e => this.setState({loginUsername: e.target.value})}
                                placeholder=" Email"
                                required
                            />
                        </div>
                        <div className="form-section">
                            <label 
                                htmlFor="password" 
                                className="visually-hidden">
                                    Password
                            </label>
                            <input 
                                id="password" 
                                type="password" 
                                name="password" 
                                placeholder=" Password"
                                onChange={e => this.setState({loginPassword: e.target.value})}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
                                required
                            />
                        </div>
                        <div className="login-form-buttons form-section">
                            <button type="submit">Log In</button>

                            <p> Don't have an account?</p>
                            <Link to={"/create-account"}>
                                    Create Account
                            </Link>
                        </div>

                    </fieldset>
                </form>
            </div>
        );
    };
};