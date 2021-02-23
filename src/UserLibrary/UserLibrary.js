import React from 'react';
import './UserLibrary.css'
import {Link} from 'react-router-dom'
import search from '../pics/magnifying-glass.webp'


export default function UserLibrary(props) {
    if(props.stateData.fetching === false) {

        let gameList = props.stateData.gameList.map((game, idx) => {
            return (
                <Link 
                    to={`/dashboard/game/${game[0]}`}
                    key={idx} 
                    className="game"
                    id={game[0]}
                    onClick={ props.getSelectedLibraryGameInfo }
                >
                    <div>
                        <img src={`${game[1].info.thumb}`} alt={ `game package cover art of ${game[1].info.title}` }/>
                        <h4>{game[1].info.title}</h4>
                    </div>
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
    } else {
        return (
            <div></div>
        )
    }

}