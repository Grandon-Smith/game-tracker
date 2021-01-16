import React from 'react';
import {Link} from 'react-router-dom'
import "./GlobalSearch.css"
import Nav from '../Nav/Nav';
import search from '../pics/magnifying-glass.webp'
// import UserLibrary from '../UserLibrary/UserLibrary'


export default class GlobalSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           search: this.props.match.params.search,
           gameList: [],
           selectedGame: [],
        }
    }

    // clickGame = (key) => {
    //     console.log(key)
    //     this.setState({
    //         selected: true
    //     })
    // }

    componentDidMount() {
        const title = this.state.search
        fetch(`https://www.cheapshark.com/api/1.0/deals?title=${title}`)
            .then(res => {
                if(!res.ok)
                    console.log('error fetching games')
                return res.json()
            })
            .then(res => {
                if(res.length < 1)
                    console.log('there are no games with that title')
                return res
            })
            .then(res => {
                if(res.length > 0) {
                    this.setState({
                        gameList: res
                    })
                }
            })
            .catch(error => {
                console.error(error)
            })
            .then(res => {
                if(this.props.match.params.gameID) {
                    const matchingGame = this.state.gameList.filter(
                            game => parseInt(this.props.match.params.gameID) === parseInt(game.gameID) )
                    const game = matchingGame.filter(game => game.isOnSale === "1")
                    this.setState({
                        selectedGame: game
                    })
                }
            })
    }

    generateSearchResults = () => {
        let gameSearch = this.state.gameList.filter(game => game.isOnSale === "1")
        gameSearch = gameSearch.map((game, idx) => {
            return (
                <Link 
                    to={`/dashboard/${this.props.match.params.user_id}/${this.props.match.params.search}/${this.state.gameList[idx].gameID}`}
                    key={idx} className="search-res"
                    id={idx}
                    onClick={() => this.getSelectedGameInfo(parseInt(this.state.gameList[idx].gameID))}
                >

                    <div className="global-game"
>
                        <h4>{game.title}</h4>
                        <img
                            src={`${game.thumb}`}
                            alt={ `game package cover art of ${game.title}` }
                            className="search-res-img"
                        />
                    </div>
                </Link>
            )
        })
        return gameSearch
    }

    getSelectedGameInfo = (id) => {
        const matchingGame = this.state.gameList.filter(game => id === parseInt(game.gameID))
        const game = matchingGame.filter(game => game.isOnSale === "1")
        this.setState({
            selectedGame: game
        })
    }

    addGameToUserList = () => {

    }

    generateSelectedGameInfo = () => {
        const game = this.state.selectedGame;
        console.log(game)
        return game.map((game, idx) => 
            <div key={idx} className="game-info">
                <h3>{game.title}</h3>
                <img src={game.thumb} alt={`game cover of ${game.title}`}/>
                <h5>Metacritic Score: {game.metacriticScore === 0 ? "--": game.metacriticScore}</h5>
                <h5>Steam Rating: {game.steamRatingPercent === 0 ? "--": `${game.steamRatingPercent} % -- ${game.steamRatingText}`}</h5>
                <h5>Normal Price: ${game.normalPrice}</h5>
                <h5>Sale Price: ${game.salePrice}</h5>
               
                <a href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`} rel="noreferrer" target="_blank">Buy the Game</a>
                <button onClick={() => this.props.history.push(`/dashboard/${this.props.match.params.user_id}/${this.props.match.params.search}`)}>Go Back</button>
                <button onClick={() => this.addGameToUserList(game.gameID)}>Add to Watch List</button>
            </div>
        )
    }

    render() {
        console.log(this)
        if(!this.props.match.params.gameID){
            return (
                <div className="body">
                    <Nav title={'/dashboard/:user_id'}/>
                    <form className="search-form" onSubmit={this.globalSearch}>
                        <div className="global-search-div">
                            <input
                                id="globalSearch"
                                type="text" 
                                placeholder="Search game deals"
                                onChange={e => this.setState({search: e.target.value})}
                            />
                            <button type="submit">
                                <img 
                                    src={search} 
                                    className="search-icon"
                                    alt="magnifying glass search icon"
                                />
                            </button>
                        </div>
                    </form>
                    <div className="global-search-container">
                        { this.generateSearchResults() }
                    </div>
                </div>
            )
        } 
        else {
            return(
                <div className="body">
                    <Nav title={'/dashboard/:user_id'}/>
                    <form className="search-form" onSubmit={this.globalSearch}>
                        <div className="global-search-div">
                            <input
                                id="globalSearch"
                                type="text" 
                                placeholder="Search game deals"
                                onChange={e => this.setState({search: e.target.value})}
                            />
                            <button type="submit">
                                <img 
                                    src={search} 
                                    className="search-icon"
                                    alt="magnifying glass search icon"
                                />
                            </button>
                        </div>
                    </form>
                    { this.generateSelectedGameInfo() }
                </div>
            )
        }
        
    }
}