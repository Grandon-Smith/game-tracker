import React from 'react';
import './Welcome.css';
import Nav from '../Nav/Nav';
// import controller from '../pics/holding-controller.jpg';
import graph from '../pics/graph.jpg';
import data from './Welcome-obj'


export default function Welcome() {
    const secData = data.map((d, idx) => {
        return (
            <div className="welc-sec-info-2" key={idx}>
                <div className="welc-img-wrapper">
                    <img
                        src={d.imgSrc} 
                        alt={d.imgAlt}
                        className={d.imgClass}
                    />
                </div>
                <p>{d.imgText}</p>
            </div>
        )
    })
    
    return (
        <div>
            <Nav 
                title={'/'}
                login={true}
                register={true}
            />
            <div className="welcome-container">

                <section className="welcome-sec-1">
                    <div className="welc-img-wrapper">
                        <img
                            src={graph} 
                            alt="line graph"
                        />
                    </div>
                    <div className="welc-sec-1-text">
                        <h3>Welcome to Game Saver!</h3>
                        <h4>Where we help you compare game prices across online stores!</h4>
                    </div>
                </section>

                <section className="welcome-sec-2">
                    <h3>About Us:</h3>
                    {secData}
                </section>
            </div>
        </div>
    );
};

