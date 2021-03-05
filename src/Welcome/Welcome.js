import React from 'react';
import './Welcome.css';
import Nav from '../Nav/Nav';
// import controller from '../pics/holding-controller.jpg';
import graph from '../pics/graph.jpg';
import search from '../pics/search-page.svg';
import saveInfo from '../pics/save-info.svg';
import saveMoney from '../pics/save-money.svg';



export default function Welcome() {
    return (
        <div>
            <Nav 
                title={'/'}
                login={true}
                register={true}
            />
            <div className="welcome-container">
                <section className="welcome-sec">
                    <img
                        src={graph} 
                        alt="man holding an xbox controller."
                    />
                    <div>
                        <h3>Welcome to Game Saver!</h3>
                        <h4>Where we help you compare game prices across online stores!</h4>
                    </div>
                </section>

                <section className="welcome-sec">
                    {/* <img
                        src={controller}
                        alt="man holding an xbox controller."
                    /> */}
                    {/* <div> */}
                        <h3>About Us:</h3>
                        <div>
                            <div className="welc-sec-info">
                                <div className="welc-img-wrapper">
                                    <img
                                        src={search} 
                                        alt="magnifying glass looking over a web page."
                                        className="welc-img"
                                    />
                                </div>
                                <p>Search our database for the games you'd like to follow</p>
                            </div>
                            <div className="welc-sec-info">
                                <div className="welc-img-wrapper">
                                    <img
                                        src={saveInfo} 
                                        alt="magnifying glass looking over a web page."
                                        className="welc-img"
                                    />
                                </div>
                                <p>Save that game to your favorites to quickly check on the price!</p>
                            </div>
                            <div className="welc-sec-info">
                                <div className="welc-img-wrapper">
                                    <img
                                        src={saveMoney} 
                                        alt="magnifying glass looking over a web page."
                                        className="welc-img"
                                    />
                                </div>
                            </div>

                        </div>
                        <h4>This app specializes in saving you money buying the games you love.
                            We search for game prices, their history, etc and let you know if it's a 
                            good time to buy
                        </h4>
                    {/* </div> */}
                </section>
            </div>
        </div>
    );
};