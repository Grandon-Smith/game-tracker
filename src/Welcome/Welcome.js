import React from 'react';
import './Welcome.css';
import Nav from '../Nav/Nav';
import controller from '../pics/holding-controller.jpg'
import graph from '../pics/graph.jpg'



export default function Welcome() {
    return (
        <div>
            <Nav title={'/'}/>
            <div className="welcome-container">
                <section className="sec-1">
                    <img src={graph} alt="man holding an xbox controller."/>
                    <div>
                        <h3>Welcome to Game Saver!</h3>
                        <h4>Where we help you compare game prices across online stores!</h4>
                    </div>
                </section>
                <section className="sec-2">
                    <h3>About Us:</h3>
                    <h4>This app specializes in saving you money buying the games you love.
                        We search for game prices, their history, etc and let you know if it's a 
                        good time to buy
                    </h4>
                    <img src={controller} alt="man holding an xbox controller."/>
                </section>
            </div>
        </div>
    )
}

