import React from 'react';
import { Link } from 'react-router-dom'
import "./Dashboard.css"
import Nav from '../Nav/Nav';
import search from '../pics/magnifying-glass.webp'
import UserLibrary from '../UserLibrary/UserLibrary'


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           search: "",
           gameList: [],
        }
    }

    globalSearch = (e) => {
        e.preventDefault()
        this.props.history.push(`/dashboard/${this.props.match.params.user_id}/${this.state.search}`)
        // const title = this.state.search
        // fetch(`https://www.cheapshark.com/api/1.0/games?title=${title}`)
        //     .then(res => {
        //         if(!res.ok)
        //             console.log('error fetching games')
        //         return res.json()
        //     })
        //     .then(res => {
        //         if(res.length < 1)
        //         console.log('there are no games with that title')
        //         return res
        //     })
        //     .then(res => {
        //         if(res.length > 0)
        //         this.setState({
        //             gameList: res
        //         })
        //     })
        //     .catch(error => {
        //         console.error(error)
        //     })
    }


    render() {
        console.log(this)
        return (
            <div>
                <Nav title={'/dashboard/:user_id'}/>
                <form className="global-search" onSubmit={this.globalSearch}>
                    <input 
                        type="text" 
                        onChange={e => this.setState({search: e.target.value})}
                    />
                    {/* <Link to={'/dashboard/:user_id/search'}> */}
                        <button type="submit">
                            <img 
                                src={search} 
                                className="search-icon"
                                alt="magnifying glass search icon"
                            />
                        </button>
                    {/* </Link> */}
                </form>
                <UserLibrary />
            </div>
        )
    }
}