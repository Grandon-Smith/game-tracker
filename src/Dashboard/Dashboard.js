import React from 'react';
// import {Link} from 'react-router-dom'
import "./Dashboard.css"
import Nav from '../Nav/Nav';
import search from '../pics/magnifying-glass.webp'
import UserLibrary from '../UserLibrary/UserLibrary'


export default class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <Nav title={'/dashboard/:user_id'}/>
                <form className="global-search">
                    <input type="text"/>
                    <button type="submit">
                        <img src={search} className="search-icon" alt="magnifying glass search icon"/>
                    </button>
                </form>
                <UserLibrary />
            </div>
        )
    }
}