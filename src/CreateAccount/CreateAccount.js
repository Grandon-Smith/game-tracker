import React from 'react';
import './CreateAccount.css';
import Nav from '../Nav/Nav';
// import { Link } from 'react-router-dom'

export default class CreateAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            createEmail: "",
            createPassword: "",
        }
    }

    createAcct = (e, email, pass) => {
        e.preventDefault()
        fetch('http://localhost:8000/create-account'
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
        .then(res => {
            if(!res.ok) {
                console.log("oh no")
            }
            console.log(res)
        })

    }

    render(){
        console.log(this.state)
        return (
            <div className="login-container">
                <Nav title={'/'}/>
                <form onSubmit={e => this.createAcct(e, this.state.createEmail, this.state.createPassword)}>
                    <fieldset className="login-form">
                        <legend>Create Account:</legend>
                        <label htmlFor="username" name="username">Email: </label>
                        <input
                            id="username" 
                            type="text"
                            onChange={e => this.setState({createEmail: e.target.value})}
                        />
                        <label htmlFor="password" name="password">Password: </label>
                        <input 
                            id="password" 
                            type="password" 
                            name="password" 
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
                            required
                            onChange={e => this.setState({createPassword: e.target.value})}
                        />
                        {/* <Link to={"/login"}> */}
                            <button type="submit">Create Account</button>
                        {/* </Link> */}
                    </fieldset>
                </form>
            </div>
        )
    }
}