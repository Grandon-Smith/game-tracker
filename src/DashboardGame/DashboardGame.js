import React from 'react';
// import './UserLibrary.css'
// import {Link} from 'react-router-dom'



export default class DashboardGame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            textDisplay: false,
            gamePrice: 0,
            userEmail: "",
            submitStatus: false,
        }
    }

    ToggleButton() {
        this.setState((currentState) => ({
            textDisplay: !currentState.textDisplay, 
        }));
    }

    followGame = (e) => {
        e.preventDefault()
        let email = this.state.userEmail;
        let gameId = this.props.propData.match.params.gameId;
        let gamePrice = this.state.gamePrice;
        let setUrl = `https://www.cheapshark.com/api/1.0/alerts?action=set&email=${email}&gameID=${gameId}&price=${gamePrice}`
        fetch(setUrl)
        .then( res => {
            if(res) {
                this.setState({textDisplay: false, submitStatus: true})
            }
        })
    }

    followGameForm() {
        return(
            <form onSubmit={this.followGame}>
                <fieldset>
                    <legend>Set price for alert: </legend>
                    <label 
                        htmlFor="price" 
                        name="price"
                    >
                        Price: 
                    </label>
                    <input 
                        type="text" 
                        name="price" 
                        id="price"
                        placeholder="10"
                        onChange={e => this.setState({gamePrice: e.target.value})}
                    />
                    <label htmlFor="gameemail" name="gameemail">Email: </label>
                    <input
                        type="text" 
                        name="gameemail" 
                        id="gameemail"
                        placeholder="your-email@yourdomain.com"
                        onChange={e => this.setState({userEmail: e.target.value})}
                    />
                    <input type="submit"/>
                </fieldset>
            </form>
        )
    }
    
    generateSelectedLibraryGameInfo = () => {
        let game = this.props.stateData.gameList.filter(game => parseInt(this.props.stateData.gameId) === parseInt(game.gameID))
        // let matchingGame = this.state.gameList.filter(game => parseInt(this.props.propData.match.params.gameId) === parseInt(game.gameID))
        game = game.filter(game => game.isOnSale === "1")
        return game.map((game, idx) => 
            <div key={idx} className="game-info">
                <h3>{game.title}</h3>
                <img src={game.thumb} alt={`game cover of ${game.title}`}/>
                <h5>Metacritic Score: {game.metacriticScore === 0 ? "--": game.metacriticScore}</h5>
                <h5>Steam Rating: {game.steamRatingPercent === 0 ? "--": `${game.steamRatingPercent} % -- ${game.steamRatingText}`}</h5>
                <h5>Normal Price: ${game.normalPrice}</h5>
                <h5>Sale Price: ${game.salePrice}</h5>
            
                <a href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`} rel="noreferrer" target="_blank">Buy the Game</a>
                <button onClick={ this.props.goBack }>Close</button>
                <button onClick={ () => this.removeGameFromUserList(game.gameID)}>Remove From Watchlist</button>
                <button onClick={() => this.ToggleButton()}>
                  Set Price Alert
                </button>
                {this.state.textDisplay && this.followGameForm()}
                {this.state.submitStatus && "game alert set!"}
            </div>
        )
    }

    render() {        
        return (
            this.generateSelectedLibraryGameInfo()
        )
    }
}