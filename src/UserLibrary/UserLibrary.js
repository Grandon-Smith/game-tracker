import React from 'react';
import './UserLibrary.css'
import {Link} from 'react-router-dom'
import search from '../pics/magnifying-glass.webp'


export default function UserLibrary(props) {

    const gameList = props.GAMES.map((game, idx) => {
        return (
            <Link 
                to={`/dashboard/game/${game.gameID}`}
            // <button
                key={idx} 
                className="game"
                id={game.gameID}
                onClick={ props.getSelectedLibraryGameInfo }
            >
                <div>
                    <img src={`${game.thumb}`} alt={ `game package cover art of ${game.title}` }/>
                    <h4>{game.title}</h4>
                </div>
            {/* </button> */}
            </Link>
        )
    })


    return (
        <div className="user-library-wrapper">
            <section className="game-search">
                <h3>Games you follow: </h3>
                <form>
                    <input type="text"/>
                    <button type="submit">
                            <img 
                                src={search} 
                                alt="magnifying glass search icon" 
                                className="search-icon-2"
                            />
                    </button>
                </form>
            </section>
            <div className="container">
                {gameList}
            </div>
        </div>
    )
        
}