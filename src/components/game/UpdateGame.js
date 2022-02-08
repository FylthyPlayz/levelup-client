import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getGameTypes, getGameById } from "./GameManager"
import { updateGame } from "./GameManager"


export const UpdateGameForm = () => {
    const [gameTypes, setGameTypes] = useState([])
    const {gameId} = useParams()
    const history = useHistory()
    const [currentGame, setCurrentGame] = useState({

        skill_level: 1,
        number_of_players: 0,
        title: "",
        maker: "",
        game_type: 0
    })

   
    useEffect(() => {
        getGameTypes().then(gameTypes => setGameTypes(gameTypes))
    }, [])
    
    useEffect(() => {
        getGameById(gameId).then(gameData => setCurrentGame({
            skill_level: gameData.skill_level,
            number_of_players: gameData.number_of_players,
            title: gameData.title,
            maker: gameData.maker,
            game_type: gameData.game_type.id}))
            .then(getGameTypes().then(data => setGameTypes(data)))
    }, [gameId])

    const changeUpdatedGame = (domEvent) => {
        domEvent.preventDefault()
        const copy = { ...currentGame }
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentGame(copy)
    }

    return (
        <form className="updateForm">
            <h2 className="updateForm__title">Edit the game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeUpdatedGame}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeUpdatedGame}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="text" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeUpdatedGame}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill level: </label>
                    <input type="text" name="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeUpdatedGame}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Game Type: </label>
                    <select name="game_type" required autoFocus className="form-control"
                        value={currentGame.game_type}
                        onChange={changeUpdatedGame}>
                        <option value="0"> Select a Game type</option>
                        {
                            gameTypes.map(gameType => (
                                <option key={gameType.id} value={gameType.id}>
                                    {gameType.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type)
                    }

                    // Send POST request to your API
                    updateGame(game, gameId)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Update</button>

        </form>
    )

}
