import React from 'react';
import './nav.css'
import {Link} from 'react-router-dom'

export default function Nav(props) {
    return (
        <header className="nav-header">
            <h1>
                <a href={props.title}>Game Saver</a>
            </h1>
            <nav>
                <Link to={'/login'}>
                    <input type="button" value="log in"/>
                </Link>
            </nav>
        </header>
    )
}