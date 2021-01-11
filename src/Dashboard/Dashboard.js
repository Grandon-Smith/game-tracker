import React from 'react';
import {Link} from 'react-router-dom'
import "./Dashboard.css"
import Nav from '../Nav/Nav';
import search from '../pics/magnifying-glass.webp'
import UserLibrary from '../UserLibrary/UserLibrary'



export default function Dashboard() {
    return (
        <div>
            <Nav title={'/dashboard/:user_id'}/>
            <form>
                <input type="text"/>
                <button type="submit"><img src={search} className="search-icon"/></button>
            </form>
            <UserLibrary />
        </div>
    )
}