import React from 'react';
import './nav.css'
import {Link} from 'react-router-dom'

export default function Nav(props) {
    return (
        <header className="nav-header">
            
            <nav>
                <h1>
                    <a href={props.title}>Game Saver</a>
                </h1>
                <Link to={props.routerUrl} className={props.hidden}>
                    <input 
                        type="button" 
                        value={props.buttonText} 
                        onClick={e => props.click}
                    />
                </Link>
            </nav>
        </header>
    )
}