import React from 'react';
import './UserLibrary.css'
import {Link} from 'react-router-dom'
import search from '../pics/magnifying-glass.webp'
import GAMES from '../STORE'


export default class UserLibrary extends React.Component {

    componentDidMount() {
        //fetch call to get games
    }

    render() {

        const gameList = GAMES.map(game => {
            return (
                <div className="game" key={game.gameId}>
                    <h4>{game.title}</h4>
                    <p>Normal Price: {game.normalPrice}</p>
                    <p>Current Sale Price: {game.salePrice}</p>
                    <img src={`${game.thumb}`}/>
                </div>
            )
        })

        console.log(GAMES)
        return (
            <div className="wrapper">
                <section className="game-search">
                    <h3>Games you follow: </h3>
                    <form>
                        <input type="text"/>
                        <button type="submit"><img src={search} className="search-icon"/></button>
                     </form>
                </section>
                <div  className="container">
                    {gameList}
                </div>
            </div>
        )
    }
}