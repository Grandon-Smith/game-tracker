import React from 'react';
import STORES from '../STORE';
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
            gameData: null
        }
    }

    ToggleButton() {
        this.setState((currentState) => ({
            textDisplay: !currentState.textDisplay, 
        }));
    }

    setPriceAlert = (e) => {
        e.preventDefault()
        let email = sessionStorage.user;
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
            <form onSubmit={this.setPriceAlert}>
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

    getStoreName(storeNum) {
        let store = STORES.filter(s => parseInt(s.storeID) === parseInt(storeNum))
        // console.log(store)
        return (
            <h3>{store[0].storeName}</h3>
                
        )
    }

    getStoreImg(storeNum) {
        let store = STORES.filter(s => parseInt(s.storeID) === parseInt(storeNum))
        return (
                <img 
                    src={'https://www.cheapshark.com' + store[0].images.logo}
                    alt={store[0].storeName + `company logo`}
                />
        )
    }

    componentDidMount() {
        let selectedGame = this.props.stateData.gameList.filter(game => game[0] === this.props.propData.match.params.gameId)
        console.log(selectedGame)
    }
    
    generateSelectedLibraryGameInfo() {
        let selectedGame = this.props.stateData.gameList.filter(game => game[0] === this.props.propData.match.params.gameId)
        selectedGame = selectedGame[0][1].deals.sort(function(a, b){return b.savings-a.savings})
        console.log(selectedGame)
        let stores = selectedGame.map((store, idx) => {
            return (
                <div key={idx} className="store-wrapper">
                    {this.getStoreName(store.storeID)}
                    <div className="store-info-wrapper">

                        <div className='store-img-wrapper'>
                            {this.getStoreImg(store.storeID)}
                        </div>

                        <div className="store-sale-data-wrapper">
                            <p>Current Price: {store.price}</p>
                            <p>Retail Price: {store.retailPrice}</p>
                            <p>Discount: {Math.floor(store.savings)+`%`}</p>
                            <a href={`https://www.cheapshark.com/redirect?dealID=`+store.dealID} target="_blank" rel="noreferrer">
                                <button>
                                    Check Deal
                                </button>
                            </a>
                        </div>

                    </div>
                </div>
            )
        })
        // console.log(storeList)

        // let game = this.props.stateData.gameList.filter(game => parseInt(this.props.stateData.gameId) === parseInt(game.gameID))
        // let matchingGame = this.state.gameList.filter(game => parseInt(this.props.propData.match.params.gameId) === parseInt(game.gameID))
        // storeList = game.filter(game => game.isOnSale === "1")
        // return game.map((game, idx) => 
        //     <div key={idx} className="game-info">
        //         <h3>{game.title}</h3>
        //         <img src={game.thumb} alt={`game cover of ${game.title}`}/>
        //         <h5>Metacritic Score: {game.metacriticScore === 0 ? "--": game.metacriticScore}</h5>
        //         <h5>Steam Rating: {game.steamRatingPercent === 0 ? "--": `${game.steamRatingPercent} % -- ${game.steamRatingText}`}</h5>
        //         <h5>Normal Price: ${game.normalPrice}</h5>
        //         <h5>Sale Price: ${game.salePrice}</h5>
            
        //         <a href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`} rel="noreferrer" target="_blank">Buy the Game</a>
        //         <button onClick={ this.props.goBack }>Close</button>
        //         <button onClick={() => this.removeGameFromUserList(game.gameID)}>Remove From Watchlist</button>
        //         <button onClick={() => this.ToggleButton()}>
        //           Set Price Alert
        //         </button>
        //         {this.state.textDisplay && this.followGameForm()}
        //         {this.state.submitStatus && "game alert set!"}
        //     </div>
        // )
        return stores
    }

    render() {      
        if(this.props.stateData.fetching === false) {
            return (
                <div>
                    {this.generateSelectedLibraryGameInfo()}
                </div>
            )
        } return(<div></div>)
    }
}