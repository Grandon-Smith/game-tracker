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
           search: "",
           gameList: [],
        }
    }

    componentDidMount() {
        const title = this.props.match.params.search
        fetch(`https://www.cheapshark.com/api/1.0/games?title=${title}`)
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
                if(res.length > 0)
                this.setState({
                    gameList: res
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    generateSearchResults = () => {

    }



    render() {
        console.log(this.state)
        return (
            <div>
                <Nav title={'/dashboard/:user_id/search'}/>
                <form className="global-search" onSubmit={this.globalSearch}>
                    <input 
                        type="text" 
                        onChange={e => this.setState({search: e.target.value})}
                    />
                    <Link to={'/dashboard/:user_id/search'}>
                        <button type="submit">
                            <img 
                                src={search} 
                                className="search-icon"
                                alt="magnifying glass search icon"
                            />
                        </button>
                    </Link>
                </form>
            <h2>
                HELLO THERE
            </h2>
            </div>
        )
    }
}