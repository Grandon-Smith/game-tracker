import React from 'react';
import STORES from '../STORE';
import Utils from '../utils'




export default class DashboardGame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            textDisplay: false,
            gamePrice: 0,
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


    removeGameFromUserList(gameid) {
        let url = `${Utils.api.url + '/removegame'}`;
        console.log(url)
        fetch(url
        , {
            method: 'DELETE',
            headers: new Headers({
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "email": sessionStorage.user,
                "gameid": gameid,
            })
        })
        .then(res => {
            console.log(res)
            this.props.propData.history.push(`/dashboard/${sessionStorage.user}`)
        })
        .then(res => window.location.reload(false))
        .catch(err => console.log(err))
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
                    <input type="submit"/>
                </fieldset>
            </form>
        )
    }

    generateTitleCard() {
        let selectedGame = this.props.stateData.gameList.filter(game => game[0] === this.props.propData.match.params.gameId);
        return (
            <div className="title-card">
                <h2>{selectedGame[0][1].info.title}</h2>
                <div>
                    <img src={selectedGame[0][1].info.thumb}/>
                </div>
                <button onClick={() => this.removeGameFromUserList(parseInt(selectedGame[0][0]))}>
                    Remove From Watchlist
                </button>
                <button onClick={() => this.ToggleButton()}>
                    Set Price Alert
                </button>
                {this.state.textDisplay && this.followGameForm()}
                {this.state.submitStatus && "game alert set!"}
            </div>
        )
    }
    
    generateSelectedLibraryGameInfo() {
        let selectedGame = this.props.stateData.gameList.filter(game => game[0] === this.props.propData.match.params.gameId);
        selectedGame = selectedGame[0][1].deals.sort(function(a, b){return a.price-b.price});
        let stores = selectedGame.map((store, idx) => {
            return (
                <div key={idx} className="store-wrapper">
                    {Utils.getStoreName(store.storeID)}
                    <div className="store-info-wrapper">

                        <div className='store-img-wrapper'>
                            {Utils.getStoreImg(store.storeID)}
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
            );
        });
        return stores;
    }

    render() {      
        console.log(this)
        if(this.props.stateData.fetching === false) {
            return (
                <div>
                    {this.generateTitleCard()}
                    {this.generateSelectedLibraryGameInfo()}
                </div>
            );
        } return(<div></div>);
    };
};