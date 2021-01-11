import React from 'react';
import './UserLibrary.css'
import {Link} from 'react-router-dom'
import search from '../pics/magnifying-glass.webp'
import GAMES from '../STORE'


export default class UserLibrary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           userGames: GAMES
        }
    }
    componentDidMount() {
        //fetch call to get games
    }

    render() {

        const gameList = this.state.userGames.map((game, idx) => {
            return (
                <Link to={`/dashboard/user_id/${idx}`} key={idx} className="game" >
                    <div>
                        <h4>{game.title}</h4>
                        <img src={`${game.thumb}`} alt={ `game package cover art of ${game.title}` }/>
                    </div>
                </Link>
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
                <div className="container">
                    {gameList}
                </div>
            </div>
        )
    }
}