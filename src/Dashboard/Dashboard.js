import React from 'react';
import { Link } from 'react-router-dom'
import "./Dashboard.css"
import Nav from '../Nav/Nav';
import search from '../pics/magnifying-glass.webp'
import UserLibrary from '../UserLibrary/UserLibrary'
import DashboardGame from '../DashboardGame/DashboardGame'
import Utils from '../utils'



export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           search: "",
           gameList: [],
           fetching: true,
           gameId: this.props.match.params.gameId ? this.props.match.params.gameId: null,
        }
    }

    globalSearch = (e) => {
        e.preventDefault()
        this.props.history.push(
            `/dashboard/${this.props.match.params.user_id}/${this.state.search}`)
    }

    async componentDidMount() {
        const user = sessionStorage.user
            await fetch('http://localhost:8000/usergames', {
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
                let arr = stuff.map(a => `${a.gameid.toString()},`).join('')
                arr = arr.slice(0, -1)
                const url = `https://www.cheapshark.com/api/1.0/games?ids=`.concat(arr)
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        this.setState({
                            gameList: Object.entries(data),
                            fetching: false
                        })
                    })
            })
            .catch(err => 
                console.error(err)
            )
    }



    goBack = (e) => {
        this.props.history.goBack()
    }

    getSelectedLibraryGameInfo = (e) => {
        const id = parseInt(e.currentTarget.id)
        this.setState({
            gameId: id,
        })
    }

    render() {
        if(!sessionStorage.getItem('user')) {
            this.props.history.push('/login')
        }

        if(this.props.match.path === "/dashboard/:user_id")
            return (
                <div>
                    <Nav 
                        title={`/dashboard/${sessionStorage.user}`}
                        routerUrl={'/'}
                        buttonText={'Log out'}
                        click={Utils.logout}
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
                            stateData={this.state}
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
                    title={`/dashboard/${sessionStorage.user}`}
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