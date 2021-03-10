import React from 'react';
import './UserLibrary.css'
import {Link} from 'react-router-dom';
// import search from '../pics/magnifying-glass.webp';
export default function UserLibrary(props) {

    if(props.stateData.fetching === false) {
        let gameList = props.stateData.gameList.map((game, idx) => {
            return (
                <Link 
                    to={`/dashboard/game/${game[0]}`}
                    key={idx} 
                    className="user-game"
                    id={game[0]}
                    onClick={ e => props.getSelectedLibraryGameInfo(e) }
                >
                    <div className="user-library-img-wrapper">
                        <img 
                            src={`${game[1].info.thumb}`} 
                            alt={ `game package cover art of ${game[1].info.title}` }
                        />
                    </div>
                    <h4>{game[1].info.title}</h4>
                </Link>
            );
        });
        return (
            <div className="user-library-container">
                <section className="user-library-game-search">
                    <h2>Games you follow</h2>
                    {/* <form>
                        <input type="text"/>
                        <button type="submit">
                                <img 
                                    src={search} 
                                    alt="magnifying glass search icon" 
                                    className="search-icon-2"
                                />
                        </button>
                    </form> */}
                </section>
                <div className="user-library-game-list">
                    {gameList.length > 0 
                        ? gameList 
                        : <h3>You aren't following any games yet! Search for a game to follow.
                             When you do, it will show up here!</h3>}
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    };
};