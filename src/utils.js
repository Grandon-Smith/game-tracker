import {Link} from 'react-router-dom';
import STORES from './STORE';

const Utils = {
    api: {'nodeUrl': 'http://localhost:8000'},
    logout() {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('name')
    },
    generateSearchResults(gameList, propdata) {
        console.log(propdata)
        let gameSearch = gameList.filter(game => game.isOnSale === "1")
        gameSearch = gameSearch.map((game, idx) => {
            return (
                <Link 
                    to={`/dashboard/${propdata.match.params.user_id}/${propdata.match.params.search}/${gameList[idx].gameID}`}
                    key={idx} className="search-res"
                    id={idx}
                    onClick={() => this.getSelectedGameInfo(parseInt(gameList[idx].gameID))}
                >

                    <div className="global-game"
>
                        <h4>{game.title}</h4>
                        <img
                            src={`${game.thumb}`}
                            alt={ `game package cover art of ${game.title}` }
                            className="search-res-img"
                        />
                    </div>
                </Link>
            )
        })
        return gameSearch
    },
    getStoreName(storeNum) {
        let store = STORES.filter(s => parseInt(s.storeID) === parseInt(storeNum))
        return (
            <h3>{store[0].storeName}</h3>
        )
    },
    getStoreImg(storeNum) {
        let store = STORES.filter(s => parseInt(s.storeID) === parseInt(storeNum))
        return (
                <img 
                    src={'https://www.cheapshark.com' + store[0].images.logo}
                    alt={store[0].storeName + `company logo`}
                />
        );
    },
    navBtns: {
        registerBtn() {
            return (
                <Link 
                    to="/create-account" 
                    className="nav-btn"
                >
                    Register
                </Link>
            )
        },
        loginBtn() {
            return (
                <Link 
                    to="/login" 
                    className="nav-btn"
                >
                    Log In
                </Link>
            )
        },
        logoutBtn() {
            return (
                <Link 
                    to="/login" 
                    className="nav-btn"
                    onClick={e => Utils.logout()}
                >
                    Log Out
                </Link>
            )
        },
    }
};

export default Utils;