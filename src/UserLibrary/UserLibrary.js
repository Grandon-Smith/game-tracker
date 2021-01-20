import React from 'react';
import './UserLibrary.css'
import {Link} from 'react-router-dom'
import search from '../pics/magnifying-glass.webp'


export default class UserLibrary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           gameList: this.props.GAMES,
           gameID: "",
           selectedGame: [],
        }
    }
    componentDidMount() {
        //fetch call to get games
    }

    getSelectedLibraryGameInfo = (e) => {
        const id = parseInt(e.currentTarget.id)
        const matchingGame = this.state.gameList.filter(game => parseInt(id) === parseInt(game.gameID))
        const game = matchingGame.filter(game => game.isOnSale === "1")
        this.setState({
            gameID: id,
            selectedGame: game
        })
    }
   
    generateSelectedLibraryGameInfo = () => {
        let game;
        if(!this.state.selectedGame === []) {
            game = this.state.selectedGame
        } else {
            const matchingGame = this.state.gameList.filter(game => parseInt(this.props.path.match.params.gameID) === parseInt(game.gameID))
            game = matchingGame.filter(game => game.isOnSale === "1")
        }
        return game.map((game, idx) => 
            <div key={idx} className="game-info">
                <h3>{game.title}</h3>
                <img src={game.thumb} alt={`game cover of ${game.title}`}/>
                <h5>Metacritic Score: {game.metacriticScore === 0 ? "--": game.metacriticScore}</h5>
                <h5>Steam Rating: {game.steamRatingPercent === 0 ? "--": `${game.steamRatingPercent} % -- ${game.steamRatingText}`}</h5>
                <h5>Normal Price: ${game.normalPrice}</h5>
                <h5>Sale Price: ${game.salePrice}</h5>
               
                <a href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`} rel="noreferrer" target="_blank">Buy the Game</a>
                <button onClick={() => this.props.path.history.push(`/dashboard/${this.props.path.match.params.user_id}`)}>Close</button>
                <button onClick={() => this.removeGameFromUserList(game.gameID)}>Remove From Watchlist</button>
            </div>
        )
    }


    render() {
        const gameList = this.state.gameList.map((game, idx) => {
            return (
                <Link 
                    to={`/dashboard/${this.props.path.match.params.user_id}/${game.gameID}`} 
                    key={idx} 
                    className="game"
                    id={game.gameID}
                    onClick={this.getSelectedLibraryGameInfo}
                >
                    <div>
                        <img src={`${game.thumb}`} alt={ `game package cover art of ${game.title}` }/>
                        <h4>{game.title}</h4>
                    </div>
                </Link>
            )
        })
        if(this.props.path.match.path === '/dashboard/:user_id'){
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
        else if(this.props.path.match.path ==='/dashboard/:user_id/:gameID') {
            return (
                this.generateSelectedLibraryGameInfo()
            )
        }
    }
}