import React from 'react';
import {Link} from 'react-router-dom';
import "./GlobalSearch.css";
import Nav from '../Nav/Nav';
import search from '../pics/magnifying-glass.webp';
import Utils from '../utils';


export default class GlobalSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           search: this.props.match.params.search,
           newSearch: '',
           gameList: [],
           selectedGame: [],
           usersGames: [],
           following: false,
        }
    }

    globalSearch = (e, propData) => {
        e.preventDefault()
        console.log(this.state)
        this.props.history.push(`/dashboard/${sessionStorage.name}/${this.state.newSearch}`)
        let title = this.state.newSearch;
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
            .then(res => {
                if(this.props.match.params.gameId) {
                    const matchingGame = this.state.gameList.filter(
                        game => parseInt(this.props.match.params.gameId) === parseInt(game.gameID) )
                    this.setState({
                        selectedGame: matchingGame
                    })
                }
            })
            .catch(err => console.log(err));
    };

     componentDidMount(e) {
        let title = this.state.search;
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
            .then(res => {
                if(this.props.match.params.gameId) {
                    const matchingGame = this.state.gameList.filter(
                        game => parseInt(this.props.match.params.gameId) === parseInt(game.gameID) )
                    this.setState({
                        selectedGame: matchingGame
                    })
                }
            })
            .catch(err => console.log(err));

        const user = sessionStorage.user;
        fetch(`${Utils.api.nodeUrl}/usergames`, {
            method: 'POST',
            headers: new Headers({
                "Accept": "application/json",
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                "email": user
            })
            })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    usersGames: res
                })
            })
            .catch(err => console.log(err));      
    };
    
    addGameToWatchList = (gameid) => {
        fetch(`${Utils.api.nodeUrl}/addgame`
        , {
            method: 'POST',
            headers: new Headers({
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "email": sessionStorage.user,
                "gameid": gameid,
            })
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };

    checkGameFollowStatus() {
        if(this.state.following) {
            return true;
        } else if(this.state.usersGames.length > 0) {
            let match = this.state.usersGames
                .filter(a => a.gameid === parseInt(this.props.match.params.gameId))
            if(match.length > 0) {
                return true;
            } return false;
        };
    };

    generateSearchResults = () => {
        let gameSearch = this.state.gameList
            .filter((thing, index, self) =>
                index === self.findIndex((t) => (
                    t.title === thing.title
                ))
            );

        gameSearch = gameSearch.map((game, idx) => {
            return (
                <Link 
                    to={`/dashboard/${sessionStorage.name}/${this.props.match.params.search}/${gameSearch[idx].gameID}`}
                    key={idx}
                    className="search-res"
                    id={idx}
                >
                    <h4>{game.title}</h4>
                    <div className="global-search-img-wrapper">
                        <img
                            src={`${game.thumb}`}
                            alt={ `game package cover art of ${game.title}`}
                        />
                    </div>
                </Link>
            );
        });
        return gameSearch;
    };

    generateSelectedGameInfo = () => {
        if(this.state.gameList.length > 0) {
            let game = this.state.gameList
                .filter(a => parseInt(a.gameID) === parseInt(this.props.match.params.gameId));
            game = game[0];
            return (
                <div className="global-game-wrapper">
                    <div className="close-window-btn-div">
                        <button 
                            onClick={() => {
                                this.props.history.push(`/dashboard/${this.props.match.params.user_id}/${this.props.match.params.search}`);
                                this.setState({ following: false })
                            }}>
                                X
                        </button>
                    </div>

                    <h2>{game.title}</h2>
                    <div className="global-game-img-wrapper">
                        <img src={game.thumb} alt={`game cover of ${game.title}`}/>
                    </div>
                    <div className="global-game-stats">
                        <p>Metacritic Score: {game.metacriticScore === 0 ? "--": game.metacriticScore}</p>
                        <p>Steam Rating: {game.steamRatingPercent === 0 ? "--": `${game.steamRatingPercent}%`}</p>
                        <p>Normal Price: ${game.normalPrice}</p>
                        <p>Sale Price: ${game.salePrice}</p>
                    </div>
                    <div className="global-game-user-btns">
                        <button>
                            <a href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`}
                                rel="noreferrer"
                                target="_blank">
                                    Buy Game
                            </a>
                        </button>
                        
                        <button 
                            disabled={this.checkGameFollowStatus()}
                            onClick={ () => {
                                this.addGameToWatchList(game.gameID);
                                this.setState({ following: true })
                            }}>
                                Add to Watch List
                        </button>
                    </div>
                </div>
            );
        };
    };

    render() {
        // console.log(this.props)
        if(!sessionStorage.getItem('user')) {
            this.props.history.push('/login')
        };
        if(this.props.match.path ==='/dashboard/:user_id/:search'){
            return (
                <>
                    <Nav 
                        title={`/dashboard/${this.props.match.params.user_id}`}
                        logout={true}
                    />
                    <div  className="dashboard-container">
                        <form className="search-form" onSubmit={(e) => this.globalSearch(e)}>
                            <input
                                id="globalSearch"
                                type="text" 
                                placeholder="Search game deals"
                                onChange={e => this.setState({newSearch: e.target.value})}
                            />
                            <button type="submit" className="search-icon-wrapper">
                                <img 
                                    src={search} 
                                    className="search-icon"
                                    alt="magnifying glass search icon"
                                />
                            </button>
                        </form>
                        <div className="global-search-container">
                            <h2>Search Results</h2>
                            { this.generateSearchResults() }
                        </div>
                    </div>
                </>
            );
        }
        else if (this.props.match.path ==='/dashboard/:user_id/:search/:gameId') {
            return(
                <>
                    <Nav 
                        title={`/dashboard/${sessionStorage.name}`}
                        logout={true}

                    />
                    <div className="dashboard-container">
                        <form className="search-form" onSubmit={e => this.globalSearch(e)}>
                            <input
                                id="globalSearch"
                                type="text" 
                                placeholder="Search game deals"
                                onChange={e => this.setState({newSearch: e.target.value})}
                            />
                            <button type="submit" className="search-icon-wrapper">
                                <img 
                                    src={search} 
                                    className="search-icon"
                                    alt="magnifying glass search icon"
                                />
                            </button>
                        </form>
                        {this.generateSelectedGameInfo()}
                    </div>
                </>
            );
        };
    };
}; 