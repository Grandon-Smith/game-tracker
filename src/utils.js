import {Link} from 'react-router-dom';

const Utils = {
    generateSearchResults() {
        let gameSearch = this.state.gameList.filter(game => game.isOnSale === "1")
        gameSearch = gameSearch.map((game, idx) => {
            return (
                <Link 
                    to={`/dashboard/${this.props.match.params.user_id}/${this.props.match.params.search}/${this.state.gameList[idx].gameID}`}
                    key={idx} className="search-res"
                    id={idx}
                    onClick={() => this.getSelectedGameInfo(parseInt(this.state.gameList[idx].gameID))}
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
}

export default Utils