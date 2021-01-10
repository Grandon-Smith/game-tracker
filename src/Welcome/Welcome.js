import React from 'react';
import './Welcome.css';
import Nav from '../Nav/Nav';


export default function Welcome() {
    return (
        <div>
            <Nav/>
            <section>
                <h2>Welcome to Game Saver!</h2>
                <h3>Where we help you compare game prices across online stores!</h3>
            </section>
            <section>
                <h2>About Us:</h2>
                <h3>This app specializes in saving you money buying the games you love.
                    We search for game prices, their history, etc and let you know if it's a 
                    good time to buy
                </h3>
            </section>
        </div>
    )
}