import React from 'react';
import './nav.css'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export default function Nav(props) {
    console.log(typeof props.click)
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
                        onClick={ 
                            props.click 
                            ? e => props.click(e) 
                            : null
                        }
                    />
                </Link>
            </nav>
        </header>
    )
}