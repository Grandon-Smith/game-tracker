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
        const gameSearch = this.state.gameList.map((game, idx) => {
            return (
                <Link 
                    to={`/dashboard/${this.props.match.params.user_id}/${this.props.match.params.search}/${this.state.gameList[idx].gameID}`}
                    key={idx} className="search-res">
                    <div >
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
                                className="search-icon-2"
                                alt="magnifying glass search icon"
                            />
                        </button>
                    </Link>
                </form>
                <div className="container">
                    {
                    this.generateSearchResults()
                    }
                </div>
            </div>
        )
    }
}