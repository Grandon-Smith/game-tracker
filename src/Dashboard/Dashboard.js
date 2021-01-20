import React from 'react';
// import { Link } from 'react-router-dom'
import "./Dashboard.css"
import Nav from '../Nav/Nav';
import search from '../pics/magnifying-glass.webp'
import UserLibrary from '../UserLibrary/UserLibrary'
import GAMES from '../STORE'



export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           search: "",
           gameList: [],
           followedGames: GAMES,
        }
    }

    globalSearch = (e) => {
        e.preventDefault()
        this.props.history.push(
            `/dashboard/${this.props.match.params.user_id}/${this.state.search}`)
    }


    // componentDidMount() {
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
    // }


    render() {
        console.log(this)
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
                        GAMES={this.state.followedGames}
                        path={this.props}
                    />
                </div>
            </div>
        )
    }
}