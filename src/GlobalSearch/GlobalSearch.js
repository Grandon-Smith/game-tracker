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
    }

    generateSearchResults = () => {
        let gameSearch = this.state.gameList.filter(game => game.isOnSale === "1")
        console.log(gameSearch)
        gameSearch = gameSearch.map((game, idx) => {
            return (
                <Link 
                    to={`/dashboard/${this.props.match.params.user_id}/${this.props.match.params.search}/${this.state.gameList[idx].gameID}`}
                    key={idx} className="search-res"
                    id={idx}
                    onClick={() => {this.getGameInfo()}}
                >

                    <div>
                        <h4>{game.title}</h4>
                        <img
                            src={`${game.thumb}`}
                            alt={ `game package cover art of ${game.title}` }
                        />
                    </div>
                </Link>
            )
        })
        return gameSearch
    }

    getGameInfo = () => {
        let game = this.state.gameList.filter(game => this.props.match.params.gameID === game.gameID)
        console.log(this.props.match.params)
        game = game.filter(game => game.isOnSale === "1")
        // this.setState({
        //     selectedGame: game
        // })
        console.log(this)
    }

    generateGameInfo = () => {
        
        // let game = this.state.gameList.filter(game => this.props.match.params.gameID === game.gameID)
        
        // game = game.filter(game => game.isOnSale === "1")
        // this.setState({
        //     selectedGame: game
        // })
        // console.log(game)
        // return (
        //     <div>
        //         <h3>{game[0].title}</h3>
        //     </div>
        // )
    }

    render() {
        console.log(this)
        if(!this.props.match.params.gameID){
            return (
                <div>
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
                    <div className="container">
                        {
                        this.generateSearchResults()
                        }
                    </div>
                </div>
            )
        } 
    else {
            return(
                <div>
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

                    <div className="container">
                        { this.generateGameInfo() }
                    </div>
                </div>
            )
        }
        
    }
}