import React, { useEffect, useState } from "react"
import { getGames, deleteGame } from "./GameManager.js"
import { useHistory } from 'react-router-dom'

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()
    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (

        <article className="games">
            {
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/games/new" })
                    }}
                >Register New Game</button>}
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button onClick={() => {
                            history.push({ pathname: `/games/${game.id}/update`})
                        }}>
                            Edit Game
                        </button>
                        <button onClick={() => {
                            deleteGame(game, game.id)
                            .then(response => setGames(response))
                        }}>
                            Delete Game
                        </button>
                    </section>
                })
            }
        </article>
    )
}