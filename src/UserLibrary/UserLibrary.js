import React from 'react';
import './UserLibrary.css'
import {Link} from 'react-router-dom'
import search from '../pics/magnifying-glass.webp'


export default class UserLibrary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           userGames: this.props.GAMES
        }
    }
    componentDidMount() {
        //fetch call to get games
    }

    render() {
        console.log(this.props.GAMES)
        const gameList = this.state.userGames.map((game, idx) => {
            return (
                <Link to={`/dashboard/user_id/${idx}`} key={idx} className="game" >
                    <div>
                        <img src={`${game.thumb}`} alt={ `game package cover art of ${game.title}` }/>
                        <h4>{game.title}</h4>
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
    }
}