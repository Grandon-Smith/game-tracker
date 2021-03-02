import React from 'react';
import './nav.css'
import {Link} from 'react-router-dom';
import Utils from '../utils';


export default function Nav(props) {
    return (
        <header className="header">
            <nav>
                { props.register ? Utils.navBtns.registerBtn() : null }
                { props.login ? Utils.navBtns.loginBtn() : null }
                { props.logout ? Utils.navBtns.logoutBtn() : null }
            </nav>
            <h1>
                <a href={props.title}>Game Saver</a>
            </h1>
        </header>
    );
};