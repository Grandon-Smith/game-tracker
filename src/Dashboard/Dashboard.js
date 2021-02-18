import React from 'react';
// import { Link } from 'react-router-dom'
import "./Dashboard.css"
import Nav from '../Nav/Nav';
import search from '../pics/magnifying-glass.webp'
import UserLibrary from '../UserLibrary/UserLibrary'
import DashboardGame from '../DashboardGame/DashboardGame'
import GAMES from '../STORE';
import Utils from '../utils'



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
        const user = sessionStorage.user
        fetch('http://localhost:8000/usergames', {
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
        .then(stuff => {
            console.log(stuff)
        })
        .catch(err => 
            console.error(err)
        )
    }



    goBack = (e) => {
        console.log('oh dear')
        this.props.history.goBack()
    }

    getSelectedLibraryGameInfo = (e) => {
        const id = parseInt(e.currentTarget.id)
        this.setState({
            gameId: id,
        })
    }

    render() {
        console.log(this)
        if(!sessionStorage.getItem('user')) {
            this.props.history.push('/login')
        }

        if(this.props.match.path === "/dashboard/:user_id")
            return (
                <div>
                    <Nav 
                        title={`/dashboard/${this.props.match.params.user_id}`}
                        routerUrl={'/'}
                        buttonText={'Log out'}
                        click={Utils.logout}
                        // hidden={'hide-nav'}
                    />
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
                <Nav 
                    title={`/dashboard/${this.props.match.params.user_id}`}
                    routerUrl={'/'}
                    buttonText={'Log out'}
                    click={Utils.logout}
                />
                <DashboardGame 
                    stateData={ this.state }
                    propData={ this.props }
                    goBack={ this.goBack }
                />
            </div>
            
            )
        }
    }
}