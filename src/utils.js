import {Link} from 'react-router-dom';

const Utils = {
    logout() {
        sessionStorage.removeItem('user')
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
    }

}

export default Utils