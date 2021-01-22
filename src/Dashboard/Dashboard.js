import React from 'react';
// import { Link } from 'react-router-dom'
import "./Dashboard.css"
import Nav from '../Nav/Nav';
import search from '../pics/magnifying-glass.webp'
import UserLibrary from '../UserLibrary/UserLibrary'
import DashboardGame from '../DashboardGame/DashboardGame'
import GAMES from '../STORE'



export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           search: "",
           gameList: GAMES,
           gameId: this.props.match.params.gameId,
        //    gameIsSelected: this.props.match.params.gameId ? true : false,
        }
    }

    globalSearch = (e) => {
        e.preventDefault()
        this.props.history.push(
            `/dashboard/${this.props.match.params.user_id}/${this.state.search}`)
    }

    // CALL FOR USER FOLLWED GAMES
    componentDidMount() {
    //     fetch('some-url.com')
    //     .then(res => {
    //         if(!res.ok) {
    //             console.log('oh dear, can\'t get user data')
    //         }
    //         return res
    //     })
    //     .then(res => {
    //         console.log(res)
    //     })
    //     .catch(err => 
    //         console.error(err)
    //     )
    }
    goBack = (e) => {
        console.log('oh dear')
        this.props.history.goBack()
    }

    getSelectedLibraryGameInfo = (e) => {
        const id = parseInt(e.currentTarget.id)
        // const matchingGame = this.state.gameList.filter(game => parseInt(id) === parseInt(game.gameID))
        // const game = matchingGame.filter(game => game.isOnSale === "1")
        this.setState({
            gameId: id,
        })
    }

    render() {
        console.log(this)
        if(this.props.match.path === "/dashboard/:user_id")
            return (
                <div>
                    <Nav title={`/dashboard/${this.props.match.params.user_id}`}/>
                    <div className="dashboard-container">
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

                        <UserLibrary 
                            GAMES={this.state.gameList}
                            data={this.props}
                            getSelectedLibraryGameInfo={this.getSelectedLibraryGameInfo}

                        />
                    </div>
                </div>
            )
        else if(this.props.match.path === "/dashboard/game/:gameId") {
            return (
            <div>
                <Nav title={`/dashboard/${this.props.match.params.user_id}`}/>
                <DashboardGame 
                    stateData={ this.state }
                    propData={ this.props }
                    goBack={this.goBack}
                />
            </div>
            
            )
        }
    }
}