import React from 'react';
// import './UserLibrary.css'
// import {Link} from 'react-router-dom'



export default class DashboardGame extends React.Component {

    
    generateSelectedLibraryGameInfo = () => {
        let game = this.props.stateData.gameList.filter(game => parseInt(this.props.stateData.gameId) === parseInt(game.gameID))
        // let matchingGame = this.state.gameList.filter(game => parseInt(this.props.propData.match.params.gameId) === parseInt(game.gameID))
        game = game.filter(game => game.isOnSale === "1")
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
                <button onClick={ () => this.props.data.history.push(`/dashboard/${this.props.data.match.params.user_id}`)}>Close</button>
                <button onClick={ () => this.removeGameFromUserList(game.gameID)}>Remove From Watchlist</button>
            </div>
        )
    }

    render() {
        console.log(this.props.stateData)
        
        return (
            this.generateSelectedLibraryGameInfo()
        )
    }
}